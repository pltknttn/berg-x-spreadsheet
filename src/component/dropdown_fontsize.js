import Dropdown from './dropdown';
import { h } from './element';
import { fontSizes } from '../core/font';
import { cssPrefix } from '../config';

export default class DropdownFontSize extends Dropdown {
  constructor() {
    const nfontSizes = fontSizes.map(it => h('div', `${cssPrefix}-item`)
      .on('click', () => {
        this.setTitle(`${it.pt}`);
         if (typeof this.change === 'function') {
          this.change(it);
        }
      })
      .child(`${it.pt}`));
    
    const fontSizeList = h('div', `${cssPrefix}-item-list`).children(...nfontSizes);
    fontSizeList.css({ maxHeight: '250px', overflowY: 'auto', overflowX: 'auto' });

    super('10', '65px', true, 'bottom-left', fontSizeList);
  }
}
