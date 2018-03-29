import * as request from 'request-promise-native'
import { createWriteStream } from 'fs'
import { load } from 'cheerio'

var req = request.defaults({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36'
  },
  baseUrl: 'http://itsm.myecovacs.com',
  jar: true
});

function login() {
  return req({
    url: '/home/index',
    jar: true,
    headers: {
      Referer: 'http://itsm.myecovacs.com/?&a=2vM1ooGbUC73HkAWft7dmA%3d%3d&h=&dt=20171205050659'
      // Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    }
  })
}
function getList() {
  return req('/pendingList/demandList').then((str: string) => {
    var reg = /<a href="(\/itsm\/detail\/[^"]+)/g;
    var ret: string[] = [];
    while (reg.test(str)) {
      ret.push(RegExp.$1);
    }
    return ret;
  })
}

function getDetail(url: string) {
  return req(url).then((str: string) => {
    let $ = load(str);
    let guid = $('#guid').val()
    let hasAccept = $('#accept').length > 0;
    let hasFinish = $('#finish').length > 0;
    return {
      hasAccept,
      hasFinish,
      guid
    }
  });
}

async function accept(guid: string) {
  var url = '/itsm/accept/' + guid;
  var html: string = await req(url)
  var $ = load(html);
  var $form = $('form');
  var params: any = {};
  $form.find('select,input').each((i, ele) => {
    params[ele.attribs['name']] = $(ele).val();
  });
  params.orderType = 'f044e242-03e8-48fd-8a93-2521496423ea';
  params.planEndTime = params.planStartTime;
  var ret = req.post(url)
  ret.form(params);
  return ret;
}

async function finish(guid: string) {
  var url = '/itsm/finish/' + guid;
  var html: string = await req(url)
  var $ = load(html);
  var $form = $('form');
  var params: any = {};
  $form.find('select,input').each((i, ele) => {
    params[ele.attribs['name']] = $(ele).val();
  });
  params.actualEndTime = params.actualStartTime;
  params.laborHour = Math.random() * 6 + 2;
  params.ratingforuser = 'S'
  var ret = req.post(url)
  ret.form(params);
  return ret;
}

async function exe() {
  await login();
  var list = await getList();
  for (let url of list) {
    let { hasAccept, hasFinish, guid } = await getDetail(url);
    if (hasAccept) {
      accept(guid);
      finish(guid);
    } else {
      finish(guid);
    }
  }
}
exe();
// var stream = createWriteStream('a.html')