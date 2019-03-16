//  https://stackoverflow.com/questions/53471941/js-regex-for-matching-a-complete-url
//    * problem:  fails to get the path
//  https://www.regextester.com/20

let re_url            = /http[s]:\/\/[^ ]+/g  // cheep hack

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
function morph_list(id, indent_factor=6) {
  let $list         = $(`#${id}`)
  let lines         = $list.html().split('\n')
  install_list(id, lines, indent_factor)}

// ---------------------------------------------------
function fetch_install_list(id, path, indent_factor=6){
      fetch(path)
        .then(res=>res.text())
        .then(dat=>{
            let lines         = dat.split('\n')
            install_list(id, lines, indent_factor)})
        .catch((err)=>{
            console.log(`ERR: ${err}`)})}

// ---------------------------------------------------
function install_list(id, list, indent_factor){
    let make_anchor = (s,m)=>s.replace(re_url,`<a href="${m[0]}">${m[0]}</a>`)
    let sigma       = []                    //  collect
    list.forEach((s)=>{
        let m    = re_url.exec(s)          // line is url
        let s_   = m ? make_anchor(s,m)  :  s;
        sigma.push(fix_left_margin(s_, indent_factor))})
    $(`#${id}`).html(sigma.join('\n'))}
