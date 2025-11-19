/* global document */
import { h } from './component/element';
import DataProxy from './core/data_proxy';
import Sheet from './component/sheet';
import Bottombar from './component/bottombar';
import { cssPrefix } from './config';
import { locale } from './locale/locale';
import Cr from './core/cell_range';

class Spreadsheet {
  constructor(selectors, options = {}) {
    this.selectors = selectors;
    let targetEl = selectors;
    this.options = { showBottomBar: true, ...options };
    this.sheetIndex = 1;
    this.dataSet = [];

    if (this.options.locale) {
      if (typeof this.options.locale === 'string') {
        locale(this.options.locale);
      } else if (typeof this.options.locale === 'object' && this.options.locale.lang) {
        locale(this.options.locale.lang, this.options.locale.message || {});
      }
    }

    if (typeof selectors === 'string') {
      targetEl = document.querySelector(selectors);
    }

    this.bottombar = this.options.showBottomBar 
    ? new Bottombar(
      () => {
        if (this.options.mode === 'read') return;
        const sheetIdx = this.addSheet();
        this.sheet.resetData(sheetIdx, this.dataSet);
      }, 
      (index) => {
        this.sheet.resetData(index, this.dataSet);
      },
      () => {
        this.deleteSheet();
      },
      (index, value) => {
        this.dataSet[index].name = value;
        this.sheet.trigger('change');
      }) 
    : null;

    this.dataIndex = this.addSheet();
    
    const rootEl = h('div', `${cssPrefix}`).on('contextmenu', evt => evt.preventDefault());
    
    // create canvas element
    targetEl.appendChild(rootEl.el);

    this.sheet = new Sheet(rootEl, this.dataIndex, this.dataSet, this.options.insertAtEnd);
    
    if (this.bottombar !== null) {
      rootEl.child(this.bottombar.el);
    }
  }

  get data() {
    return this.dataSet[this.dataIndex];
  }
  
  // Функция для проверки существования листа с заданным именем
  sheetExists(name) {
    return this.dataSet.some(sheet => sheet.name === name);
  }

   // Генерируем уникальное имя
  getUniqueSheetName(name) { 
    let uniqueName = name;
    let counter = 1;

    while (this.sheetExists(uniqueName)) {
      uniqueName = `${name} (${counter})`;
      counter++;
    }
    return uniqueName;
  }

   // Добавление нового листа
   addSheet(name, active = true) {
    const baseName = (name != null && name !== '') ? name : `Sheet${this.sheetIndex}`;
    const sheetName = this.getUniqueSheetName(baseName);  
    const dataProxy = new DataProxy(sheetName, this.options); 
    dataProxy.change = (...args) => {
      this.sheet.trigger('change', ...args);
    };
 
    this.dataSet.push(dataProxy);

    try {
      if (this.bottombar !== null) {
        this.bottombar.addItem(sheetName, active, this.options);
      }
    } catch (error) {
      this.dataSet = this.dataSet.filter(sheet => sheet.name !== sheetName );
      throw error;
    } 

    this.sheetIndex += 1; 
    return this.dataSet.length - 1;
  }
 
  // Удаление текущего листа
  deleteSheet() {
    if (this.bottombar === null) return;
    if (this.dataSet.length === 0) return;

    const result = this.bottombar.deleteItem();
    if (!Array.isArray(result) || result.length < 2) return;

    const [oldIndex, nindex] = result;
 
    if (oldIndex >= 0 && oldIndex < this.dataSet.length) {
      this.dataSet.splice(oldIndex, 1);
    } 

    if (this.dataSet.length > 0 &&  nindex >= 0 && nindex < this.dataSet.length) {
      this.sheet.resetData(nindex, this.dataSet);
    } 

    if (this.dataSet.length > 0) {
      this.sheet.trigger('change');
    }
  }


  loadData(data) {
    const ds = Array.isArray(data) ? data : [data];
    if (this.bottombar !== null) {
      this.bottombar.clear();
    }

    this.dataSet = [];
    this.sheetIndex = 1; // reset sheet index

    if (ds.length > 0) {
      for (let i = 0; i < ds.length; i += 1) {
        
        const it = ds[i];
        const ndi = this.addSheet(it.name, i === 0);
        this.dataSet[ndi].setData(it, true);

        if (i === 0) {
          this.sheet.resetData(ndi, this.dataSet);
        }
      }
    }
    return this;
  }

  getData() {
    this.sheet.clearEditor();
    return this.dataSet.map((it) => it.getData());
  }

  cellText(ri, ci, text, force = false, sheetIndex = 0) {
    this.sheet.clearEditor();
    if (this.dataSet.length > 0 &&  sheetIndex >= 0 && sheetIndex < this.dataSet.length) {       
      this.dataSet[sheetIndex].setCellTextRaw(ri, ci, text, force);
    }
    return this;
  }

  cellTexts(cellDataArray, saveHistory = true, force = false, sheetIndex = 0) {
    this.sheet.clearEditor();
    if (this.dataSet.length > 0 &&  sheetIndex >= 0 && sheetIndex < this.dataSet.length) {  
      if (saveHistory) {
        this.dataSet[sheetIndex].setCellTexts(cellDataArray);
      } else {
        for (const cellData of cellDataArray) {
          this.dataSet[sheetIndex].setCellTextRaw(cellData.ri, cellData.ci, cellData.text, force);
        }
      }
    }
    return this;
  }

  resetCellText(sri, sci, eri, eci, force = false, reRender = true, sheetIndex = 0) {
    if (this.dataSet.length > 0 &&  sheetIndex >= 0 && sheetIndex < this.dataSet.length) { 
      const cr = new Cr(sri, sci, eri, eci);
      cr.each((ri, ci) => {
        this.dataSet[sheetIndex].setCellTextRaw(ri, ci, null, force);
      });
    }    
    if (reRender) {
      this.reRender();
    }
  }

  cell(ri, ci, sheetIndex = 0) {
    this.sheet.clearEditor();
    return this.dataSet[sheetIndex].getCell(ri, ci);
  }

  cellStyle(ri, ci, sheetIndex = 0) {
    return this.dataSet[sheetIndex].getCellStyle(ri, ci);
  }

  reRender() {
    this.sheet.clearEditor();
    this.sheet.table.render();
    return this;
  }

  setCellStyle(ri, ci, style, reRender = true, sheetIndex = 0) {
    if (this.dataSet.length > 0 &&  sheetIndex >= 0 && sheetIndex < this.dataSet.length) { 
       this.dataSet[sheetIndex].setCellStyle(ri, ci, style);
    }
    if (reRender) {
      this.reRender();
    }
  }

  highlightCell(ri, ci, { error = false, color = '#ffff01' } = {}, reRender = true, sheetIndex = 0) {
    this.setCellStyle(ri, ci, { bgcolor: error ? '#fe0000' : color }, reRender, sheetIndex);
  }

  resetCellStyle(sri, sci, eri, eci, reRender = true, sheetIndex = 0) {
    if (this.dataSet.length > 0 &&  sheetIndex >= 0 && sheetIndex < this.dataSet.length) { 
      const cr = new Cr(sri, sci, eri, eci);
      const rows = new Set();
      const cols = new Set();
      cr.each((ri, ci) => {
        this.dataSet[sheetIndex].resetCellStyle(ri, ci);
        rows.add(ri);
        cols.add(ci);
      });
      this.dataSet[sheetIndex].setColProperties(sri);
    }

    if (reRender) {
      this.reRender();
    }
  }

  getLastUsedRowIndex(sheetIndex = 0) {
    this.sheet.clearEditor();
    
    if (this.dataSet.length === 0 || sheetIndex < 0 || sheetIndex >= this.dataSet.length) {
      return -1;
    }
    const { rows } = this.dataSet[sheetIndex];
    if (!rows || !rows.len) return -1;

    for (let ri = rows.len - 1; ri >= 0; ri--) {
      const row = rows.get(ri);
      if (!row || !row.cells) continue;

      for (const ci of Object.keys(row.cells)) {
        const cell = rows.getCell(ri, parseInt(ci, 10));        
        if (cell && cell.text !== null) {
          return ri;
        }
      }
    }

    return -1;
  }

  getLastUsedColumnIndex(ignoreRowIndex = 0, sheetIndex = 0) {
    this.sheet.clearEditor();

    if (this.dataSet.length === 0 || sheetIndex < 0 || sheetIndex >= this.dataSet.length) {
      return -1;
    }
    const { rows, cols } = this.dataSet[sheetIndex];
    if (!rows || !rows.len || !cols || !cols.len) return -1;

    // Перебираем столбцы справа налево
    for (let ci = cols.len - 1; ci >= 0; ci--) {
      // Проверяем строки сверху вниз
      for (let ri = 0; ri < rows.len; ri++) {        
        if (ri === ignoreRowIndex) {
          continue;
        }
        const cell = rows.getCell(ri, ci);        
        if (cell && cell.text !== null) {
          return ci;
        }
      }
    }
    return -1;
  }


  getChangedCells(sheetIndex = 0) {
    this.sheet.clearEditor();
    return this.dataSet[sheetIndex].history.getChangedCellValues();
  }

  getCellsGroupedByRow(sheetIndex = 0) {
    this.sheet.clearEditor();
    return this.dataSet[sheetIndex].getCellsGroupedByRow();
  }

  resetHistory(sheetIndex = 0) {
    if (this.dataSet.length > 0 &&  sheetIndex >= 0 && sheetIndex < this.dataSet.length) {
      this.dataSet[sheetIndex].history.init();
    }
    this.sheet.toolbar.undoEl.el.addClass('disabled'); 
  }

  removeFilter(sheetIndex = 0) {
    if (this.dataSet[sheetIndex].autoFilter.active()) {
      this.sheet.toolbar.trigger('autofilter');
    }
  }

  getHistoryInitialState(sheetIndex = 0) {
    const { rows, cols } = this.dataSet[sheetIndex].history.initialState;
    return ({ rows, cols });
  }

  on(eventName, func) {
    this.sheet.on(eventName, func);
    return this;
  }

  validate() {
    const { validations } = this.data;
    return validations.errors.size <= 0;
  }

  change(cb) {
    this.sheet.on('change', cb);
    return this;
  }

  cleanup() {
    this.sheet.cleanupEvents();
    for (const d of this.dataSet) {
      d.destroyMembers();
    }
    for (const m of Object.keys(this)) {
      delete this[m];
    }
  }

  static locale(lang, message) {
    locale(lang, message);
  }
}

const spreadsheet = (el, options = {}) => new Spreadsheet(el, options);

export default Spreadsheet;
export {
  spreadsheet,
};
