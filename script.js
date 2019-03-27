let re_url            = /http[s]:\/\/[^ ]+/g  // cheep hack

// ---------------------------------------------------
function highlight_match(s, re, type){
  return s.replace(re, (g0,g1) => `<span class="${type}">${g1}</span>`)}
// ---------------------------------------------------
function fix_left_margin(s, factor){
      // 'factor' = conversion factor of "natural" spaces
      let m    = /( *)(.*)/.exec(s)
      if (m) {
          let sz         = m[1].length * factor
          return `<div style="margin-left:${sz}px;">${m[2]}</div>`} 
      else {
          return s}}
// ---------------------------------------------------
function install_list(id, list, indent_factor){
    // installs 'list' making some transformations
    //  * url -> links
    //  * left margin indents based on "natural" source space
    // console.log(`xxx${id}`)
    let make_anchor = (s,m)=>s.replace(re_url,`<a href="${m[0]}">${m[0]}</a>`)
    let sigma       = []                    //  collect
    list.forEach((s)=>{
        let m     = re_url.exec(s)          // line is url
        let s_1   = m ? make_anchor(s,m)  :  s;
        let s_2   = highlight_match(s_1, /(title:)/g, 'label')
        let s_3   = highlight_match(s_2, /(\(:[a-zA-Z0-9]+)/g, 'label')
        let s_4   = fix_left_margin(s_3, indent_factor)
        sigma.push(s_4)})
    // ORIG: =  PROBLEM  $(`#${id}`).html(`<pre>${sigma.join('\n')}</pre>`)
    // FIX:             --  :BINGO
    $(`#${id}`).replaceWith(`<pre>${sigma.join('\n')}</pre>`)  }
// ---------------------------------------------------
function fetch_install_list(id, path, indent_factor=6){
    // retrieves file data and installs as list contents
    fetch(path)
      .then(res=>res.text())
      .then(dat=>{
          let lines         = dat.split('\n')
          install_list(id, lines, indent_factor)})
      .catch((err)=>{
          console.log(`ERR: ${err}`)})}
// ---------------------------------------------------
function reform_in_html_list(id, indent_factor=6) {
  // transforms and replaces an "in-html" list
  let $list         = $(`#${id}`)
  // :D - add check length here - if 0 ...
  let lines         = $list.html().split('\n')
  install_list(id, lines, indent_factor)}
// ---------------------------------------------------
function install_extern_list(){
    // uses ID naming convent assoc'd to file with list data
    $('.extern-list').each((i,e)=>{
          let id       = $(e).attr('id')
          fetch_install_list(id, `${id}.txt`)})}

