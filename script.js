//  https://stackoverflow.com/questions/53471941/js-regex-for-matching-a-complete-url
//    * problem:  fails to get the path
//  https://www.regextester.com/20
// let re_url            = /\b(https?:\/\/.*?\.[a-z]{2,4}\b)/;
let re_url            = /http[s]:\/\/[^ ]+/g    // cheep trick

function fix_left_margin(v){
        let re            = /( *)(.*)/
        let m    = re.exec(v)
        if (m) {
          let sz         = m[1].length * 5
          return `<div style="margin-left:${sz}px;">${m[2]}</div>`
        } else {
          return v}}

function morph_list(id) {
    let r             = $(`#${id}`)
    let lines         = r.text().split('\n')
    let sig           = []   // sigma / collect
    lines.forEach((v,i)=>{
        let m    = re_url.exec(v)
        if(m)    {v = v.replace(re_url,`<a href="${m[0]}">${m[0]}</a>`)}
        sig.push(fix_left_margin(v))})
    $(`#${id}`).html(sig.join('\n'))}
