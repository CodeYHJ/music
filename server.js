const express = require('express')

const request = require('request-promise')

const cors = require('cors')

const app = express()

app.use(cors())

// 公共头（QQ音乐）
const HEAD = {
    'authority': "c.y.qq.com",
    'referer': 'https://m.y.qq.com/',
    'origin': 'https://m.y.qq.com',
    'accept': 'application/json',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
}

// QQ音乐首页
app.get('/', async(req, res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_= + new Date()`;
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEAD
        }))
    } catch (e) {
        res.json({ error: e.message })
    }
})

// QQ音乐排行榜
app.get('/list', async(req, res) => {
    const url = `https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_= + new Date()`;
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEAD
        }))
    } catch (e) {
        res.json({ error: e.message })
    }
})

// QQ音乐热歌
app.get('/hot-search', async(req, res) => {
    const url = `https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEAD
        }))
    } catch (e) {
        res.json({ error: e.message })
    }
})

// QQ音乐搜索音乐
app.get('/search', async(req, res) => {
    const { keyword, page = 1 } = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+ new Date()}`
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEAD
        }))
    } catch (e) {
        res.json({ error: e.message })
    }
})

// QQ音乐歌曲获取
app.get('/song', async(req, res) => {
    const { guid, songmid, filename } = req.query
    const HEADd = {
        'authority': "c.y.qq.com",
        'referer': 'https://y.qq.com',
        'accept': '*/*',
        'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
    }
    const url = `https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?format=json&platform=yqq&cid=205361747&uin=0&songmid=${songmid}&filename=${filename}&guid=${guid}`
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADd
        }))
    } catch (e) {
        res.json({ error: e.message })
    }
})

// QQ音乐歌词获取
app.get('/lyc', async(req, res) => {
    const { id } = req.query
    const url = `https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg?nobase64=1&musicid=${id}&songtype=0`
    try {
        let text = (await request({
            uri: url,
            headers: {
                'authority': "c.y.qq.com",
                'referer': 'https://c.y.qq.com',
                'accept': '*/*',
                'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
            }
        })).replace(/MusicJsonCallback\((.*)\)/, '$1')
        res.json(JSON.parse(text))
    } catch (e) {
        res.json({ error: e.message })
    }
})




// -----------------------------------------------------------------------------
// -------------------------中国天气----------------------------------------------


// 根据经纬度获取所在城市的定义的id
// longitude:经度
// latitude:纬度
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
};

app.get('/location', async(req, res) => {
    const { lng, lat } = req.query
    const url = `http://d4.weather.com.cn/geong/v1/api?params={%22method%22:%22stationinfo%22,%22lat%22:${lat},%22lng%22:${lng}}`
    try {
        let text = (await request({
            uri: url,
            headers: {
                'Pragma': 'no-cache',
                'referer': 'http://www.weather.com.cn/',
                'accept': '*/*',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
            }
        }))
        res.json(JSON.parse(text))
    } catch (e) {
        res.json({ error: e.message })
    }
})


// 根据得到的id,获取对应的天气，返回以下变量：
// cityDZ，alarmDZ ，dataSK ，dataZS ，fc
app.get('/locationWeather', async(req, res) => {
    const { id } = req.query
    const url = `http://d1.weather.com.cn/weather_index/${id}.html?_=${+new Date()}`
    try {
        let text = (await request({
            uri: url,
            headers: {
                'Pragma': 'no-cache',
                'referer': 'http://www.weather.com.cn/',
                'accept': '*/*',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36'
            }
        })).replace(/var cityDZ =(.*);var alarmDZ =(.*);var dataSK =(.*);var dataZS=(.*);var fc=(.*)/g, '{"cityDZ":$1, "alarmDZ":$2,"dataSK":$3,"dataZS":$4,"fc":$5}')
        res.json(JSON.parse(text))
    } catch (e) {
        res.json({ error: e.message })
    }
})

app.listen(3002);