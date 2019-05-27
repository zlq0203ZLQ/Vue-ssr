const Vue = require('vue')
const server = require('express')()
const context = {
  title: 'hello'
}
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./template.html', 'utf-8')
})
const mocktitle = 'favorite games'
const mockdata = ['LoL', '王者荣耀', '和平精英']
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
      data: mockdata,
      title: mocktitle
    },
    template: `<div>The visited URL is: {{ url }}
    <h3>{{title}}</h3>
    <p v-for='item in data'>{{item}}</p>
    </div>`
  })
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
  })
})
server.listen(8080, ()=>{
    console.log("SSR is start!")
})