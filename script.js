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
    let make_anchor = (s,m)=>{
           return s.replace(re_url,`<a href="${m[0]}">${m[0]}</a>`)}
    let sigma         = []                    //  collect
    let $list         = $(`#${id}`)
    let lines         = $list.html().split('\n')
    lines.forEach((s)=>{
        let m    = re_url.exec(s)               // line is url
        let s_   = m ? make_anchor(s,m)  :  s;
        sigma.push(fix_left_margin(s_, indent_factor))})
    $(`#${id}`).html(sigma.join('\n'))}

