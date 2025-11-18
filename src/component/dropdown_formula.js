import Dropdown from './dropdown';
import Icon from './icon';
import { h } from './element';
import { baseFormulas } from '../core/formula';
import { cssPrefix } from '../config';

export default class DropdownFormula extends Dropdown {
  constructor() {
    const nformulas = baseFormulas.map(it => h('div', `${cssPrefix}-item`)
      .on('click', () => {
        this.hide();
        if (typeof this.change === 'function') {
          this.change(it);
        }
      })
      .child(it.key));
    
    const formulaList = h('div', `${cssPrefix}-item-list`).children(...nformulas);
    formulaList.css({ maxHeight: '250px', overflowY: 'auto', overflowX: 'auto' });

    super(new Icon('formula'), '185px', true, 'bottom-left', formulaList);
  }
}
