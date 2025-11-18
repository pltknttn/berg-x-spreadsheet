import Dropdown from './dropdown';
import { h } from './element';
import { baseFonts } from '../core/font';
import { cssPrefix } from '../config';

export default class DropdownFont extends Dropdown {
  constructor() {
    const defaultTitle = baseFonts.length > 0
      ? baseFonts[0].title
      : 'Select font';

    const nfonts = baseFonts.map(it => h('div', `${cssPrefix}-item`)
      .on('click', () => {
        this.setTitle(it.title);
        if (typeof this.change === 'function') {
          this.change(it);
        }
      })
      .child(it.title));

    const fontList = h('div', `${cssPrefix}-item-list`).children(...nfonts);
    fontList.css({ maxHeight: '250px', overflowY: 'auto', overflowX: 'auto' });

    super(defaultTitle, '165px', true, 'bottom-left', fontList);
  }
}
