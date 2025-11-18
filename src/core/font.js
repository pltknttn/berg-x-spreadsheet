// docs
import './_.prototypes';

/** default font list (https://online-fonts.com/use/free?page=1)
 * @type {BaseFont[]}
 */
const baseFonts = [
  { key: 'Arial', title: 'Arial' },
  { key: 'Arial Narrow', title: 'Arial Narrow' },   
  { key: 'Helvetica', title: 'Helvetica' },
  { key: 'Source Sans Pro', title: 'Source Sans Pro' },
  { key: 'Comic Sans MS', title: 'Comic Sans MS' },
  { key: 'Courier New', title: 'Courier New' },
  { key: 'Consolas', title: 'Consolas' },
  { key: 'Monaco', title: 'Monaco' },
  { key: 'Brush Script MT', title: 'Brush Script MT' },   
  { key: 'Verdana', title: 'Verdana' },
  { key: 'Lato', title: 'Lato' },
  { key: 'Roboto', title: 'Roboto' },
  { key: 'Times New Roman', title: 'Times New Roman' },
  { key: 'Georgia', title: 'Georgia' },
  { key: 'Palatino Linotype', title: 'Palatino Linotype' },
  { key: 'Tahoma', title: 'Tahoma' },
  { key: 'Trebuchet MS', title: 'Trebuchet MS' },
  { key: 'Impact', title: 'Impact' },
  { key: 'Arial Black', title: 'Arial Black' },
  { key: 'Gill Sans', title: 'Gill Sans' },
  { key: 'Calibri', title: 'Calibri' },
  { key: 'Century Gothic', title: 'Century Gothic' },
  { key: 'Lucida Sans Unicode', title: 'Lucida Sans Unicode' },  
  { key: 'Lucida Console', title: 'Lucida Console' },
  { key: 'MS Sans Serif', title: 'MS Sans Serif' },
  { key: 'MS Serif', title: 'MS Serif' },    
  { key: 'Webdings', title: 'Webdings' },
  { key: 'Wingdings', title: 'Wingdings' },
  { key: 'Zapf Dingbats', title: 'Zapf Dingbats' },
  { key: 'Symbol', title: 'Symbol' },
  { key: 'system-ui', title: 'System UI' },
  { key: 'San Francisco', title: 'San Francisco' }, 
  { key: 'Segoe UI', title: 'Segoe UI' },
  { key: 'Segoe UI Historic', title: 'Segoe UI Historic' },
  { key: 'Segoe UI Symbol', title: 'Segoe UI Symbol' },
  { key: 'Segoe UI Variable', title: 'Segoe UI Variable' },
  { key: 'Franklin Gothic Book', title: 'Franklin Gothic Book' },
  { key: 'Gabriola', title: 'Gabriola' },
  { key: 'Segoe Print', title: 'Segoe Print' },
  { key: 'Segoe Script', title: 'Segoe Script' },
  { key: 'Noto Sans', title: 'Noto Sans' },
  { key: 'Noto Serif', title: 'Noto Serif' },
  { key: 'Ubuntu', title: 'Ubuntu' },
  { key: 'Droid Sans', title: 'Droid Sans' },
  { key: 'Droid Serif', title: 'Droid Serif' },
  { key: 'PT Sans', title: 'PT Sans' },
  { key: 'PT Serif', title: 'PT Serif' },
  { key: 'Fira Sans', title: 'Fira Sans' },
  { key: 'Fira Mono', title: 'Fira Mono' },
  { key: 'Cousine', title: 'Cousine' },
  { key: 'Oxygen Mono', title: 'Oxygen Mono' },
  { key: 'Source Code Pro', title: 'Source Code Pro' },
  { key: 'Merriweather', title: 'Merriweather' },
  { key: 'Bahnschrift', title: 'Bahnschrift' },
  { key: 'Candara', title: 'Candara' },
  { key: 'Constantia', title: 'Constantia' },
  { key: 'Corbel', title: 'Corbel' },   
  { key: 'Arimo', title: 'Arimo' },
  { key: 'Tinos', title: 'Tinos' },
  { key: 'Cairo', title: 'Cairo' },
  { key: 'Hind Siliguri', title: 'Hind Siliguri' },
  { key: 'Mukta', title: 'Mukta' },
  { key: 'Nunito', title: 'Nunito' },
  { key: 'Rubik', title: 'Rubik' },
  { key: 'Work Sans', title: 'Work Sans' },
  { key: 'Exo 2', title: 'Exo 2' },
  { key: 'PT Mono', title: 'PT Mono' },
  { key: 'Inconsolata', title: 'Inconsolata' },
  { key: 'Vollkorn', title: 'Vollkorn' },
  { key: 'Cabin', title: 'Cabin' },
  { key: 'Asap', title: 'Asap' },
  { key: 'Zilla Slab', title: 'Zilla Slab' },
  { key: 'Libre Baskerville', title: 'Libre Baskerville' },
  { key: 'Playfair Display', title: 'Playfair Display' },
  { key: 'Dancing Script', title: 'Dancing Script' },
  { key: 'Raleway', title: 'Raleway' },
  { key: 'Lobster', title: 'Lobster' },
  { key: 'Pacifico', title: 'Pacifico' },
  { key: 'Amatic SC', title: 'Amatic SC' },
  { key: 'Indie Flower', title: 'Indie Flower' },
  { key: 'Shadows Into Light', title: 'Shadows Into Light' },
  { key: 'Caveat', title: 'Caveat' },
  { key: 'Permanent Marker', title: 'Permanent Marker' },
  { key: 'Gloria Hallelujah', title: 'Gloria Hallelujah' },
  { key: 'Fredoka One', title: 'Fredoka One' },
  { key: 'Bangers', title: 'Bangers' },
  { key: 'Chewy', title: 'Chewy' },
  { key: 'Concert One', title: 'Concert One' },
  { key: 'Luckiest Guy', title: 'Luckiest Guy' },
  { key: 'Carter One', title: 'Carter One' },
  { key: 'Monoton', title: 'Monoton' },
  { key: 'Orbitron', title: 'Orbitron' },
  { key: 'Audiowide', title: 'Audiowide' },
  { key: 'Major Mono Display', title: 'Major Mono Display' },
  { key: 'VT323', title: 'VT323' },
  { key: 'Press Start 2P', title: 'Press Start 2P' },
  { key: 'Share Tech Mono', title: 'Share Tech Mono' },
  { key: 'Cutive Mono', title: 'Cutive Mono' },
  { key: 'Space Mono', title: 'Space Mono' },
  { key: 'BioRhyme', title: 'BioRhyme' },
  { key: 'Karla', title: 'Karla' },
  { key: 'Hind Madurai', title: 'Hind Madurai' },
  { key: 'Hind Vadodara', title: 'Hind Vadodara' },
  { key: 'Hind Guntur', title: 'Hind Guntur' },
  { key: 'Hind Kerala', title: 'Hind Kerala' },
  { key: 'Hind', title: 'Hind' },
  { key: 'Catamaran', title: 'Catamaran' },
  { key: 'Baloo 2', title: 'Baloo 2' },
  { key: 'Baloo Bhaijaan', title: 'Baloo Bhaijaan' },
  { key: 'Baloo Tamma', title: 'Baloo Tamma' },
  { key: 'Baloo Chettan', title: 'Baloo Chettan' },
  { key: 'Baloo Paaji', title: 'Baloo Paaji' },
  { key: 'Exo', title: 'Exo' },
  { key: 'Muli', title: 'Muli' },
  { key: 'Nunito Sans', title: 'Nunito Sans' },
  { key: 'Overpass', title: 'Overpass' },
  { key: 'Quicksand', title: 'Quicksand' },
  { key: 'Saira', title: 'Saira' },
  { key: 'Saira Condensed', title: 'Saira Condensed' },
  { key: 'Saira Extra Condensed', title: 'Saira Extra Condensed' },
  { key: 'Saira Semi Condensed', title: 'Saira Semi Condensed' },
  { key: 'Saira Stencil One', title: 'Saira Stencil One' },
  { key: 'Titillium Web', title: 'Titillium Web' },
  { key: 'Ubuntu Condensed', title: 'Ubuntu Condensed' },
  { key: 'Varela Round', title: 'Varela Round' },
  { key: 'Work Sans', title: 'Work Sans' },
  { key: 'Noto Color Emoji', title: 'Noto Color Emoji' },
  { key: 'Noto Sans Arabic', title: 'Noto Sans Arabic' },
  { key: 'Noto Sans Devanagari', title: 'Noto Sans Devanagari' },
  { key: 'Noto Sans Thai', title: 'Noto Sans Thai' },
  { key: 'Inter', title: 'Inter' },
  { key: 'Poppins', title: 'Poppins' },
  { key: 'Montserrat', title: 'Montserrat' },
  { key: 'Roboto Slab', title: 'Roboto Slab' },
  { key: 'Oswald', title: 'Oswald' },
  { key: 'PT Root UI', title: 'PT Root UI' },
  { key: 'Manrope', title: 'Manrope' },
  { key: 'Figtree', title: 'Figtree' },
  { key: 'Barlow', title: 'Barlow' },
  { key: 'JetBrains Mono', title: 'JetBrains Mono' },
  { key: 'IBM Plex Mono', title: 'IBM Plex Mono' },
  { key: 'Hack', title: 'Hack' },
  { key: 'Fira Code', title: 'Fira Code' },
  { key: 'Great Vibes', title: 'Great Vibes' },
  { key: 'Courgette', title: 'Courgette' },
  { key: 'Satisfy', title: 'Satisfy' },
  { key: 'Georgia Pro', title: 'Georgia Pro' },
  { key: 'Georgia Pro Black', title: 'Georgia Pro Black' },
  { key: 'Book Antiqua', title: 'Book Antiqua' },
  { key: 'Garamond', title: 'Garamond' },
  { key: 'Baskerville', title: 'Baskerville' },
  { key: 'Bookman Old Style', title: 'Bookman Old Style' },
  { key: 'Century', title: 'Century' },
  { key: 'Copperplate Gothic Light', title: 'Copperplate Gothic Light' },
  { key: 'Goudy Old Style', title: 'Goudy Old Style' },
  { key: 'Papyrus', title: 'Papyrus' },
  { key: 'Malgun Gothic', title: 'Malgun Gothic' },
  { key: 'Meiryo', title: 'Meiryo' },
  { key: 'Microsoft YaHei', title: 'Microsoft YaHei' },
  { key: 'Wingdings 2', title: 'Wingdings 2' },
  { key: 'Wingdings 3', title: 'Wingdings 3' }
];

/** default fontSize list
 * @type {FontSize[]}
 */
const fontSizes = [
  { pt: 7.5, px: 10 },
  { pt: 8, px: 11 },
  { pt: 9, px: 12 },
  { pt: 10, px: 13 },
  { pt: 10.5, px: 14 },
  { pt: 11, px: 15 },
  { pt: 12, px: 16 },
  { pt: 14, px: 18.7 },
  { pt: 15, px: 20 },
  { pt: 16, px: 21.3 },
  { pt: 18, px: 24 },
  { pt: 22, px: 29.3 },
  { pt: 24, px: 32 },
  { pt: 26, px: 34.7 },
  { pt: 36, px: 48 },
  { pt: 42, px: 56 },
  { pt: 48, px: 62.3 },
  { pt: 72, px: 83.7},
  // { pt: 54, px: 71.7 },
  // { pt: 63, px: 83.7 },
  // { pt: 72, px: 95.6 },
];

/** map pt to px
 * @date 2019-10-10
 * @param {fontsizePT} pt
 * @returns {fontsizePX}
 */
function getFontSizePxByPt(pt) {
  for (let i = 0; i < fontSizes.length; i += 1) {
    const fontSize = fontSizes[i];
    if (fontSize.pt === pt) {
      return fontSize.px;
    }
  }
  return pt;
}

/** transform baseFonts to map
 * @date 2019-10-10
 * @param {BaseFont[]} [ary=[]]
 * @returns {object}
 */
function fonts(ary = []) {
  const map = {};
  baseFonts.concat(ary).forEach((f) => {
    map[f.key] = f;
  });
  return map;
}

export default {};
export {
  fontSizes,
  fonts,
  baseFonts,
  getFontSizePxByPt,
};
