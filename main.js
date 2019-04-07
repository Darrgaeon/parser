// GET DESCRIPTION for each link

const needle = require("needle");
const cheerio = require("cheerio");
const async = require("async");
const fs = require('fs');

// GET LIST LINKS

// let savedLinks = [];
//
// let urls = [];
// // urls[0] = "https://www.ferra.ru/news/2019/03/27";
// urls[0] = "https://www.dns-shop.ru/catalog/recipe/8f1a504b5b0852e1/igrovye-monitory/";
//
//
// const q = async.queue((url) => {
//     needle.get(url, (err,res) => {
//         if (err) throw(err);
//
//         const $ = cheerio.load(res.body);
//
//         // const href = $(".jsx-2140080109 a");
//         const hrefs = $(".view-list a:first-child");
//
//         hrefs.each((index, value) => {
//             const href = $(value).attr("href");
//             const path = `https://www.dns-shop.ru${href}characteristics/`;
//             savedLinks.push(path);
//         });
//
//         console.log("savedLinks", savedLinks);
//
//     });
// },10);
//
// let i = 0;
// while(urls.length > i) {
//     q.push(urls[i]);
//     i++;
// }

const urls = [
    'https://www.dns-shop.ru/product/0cdc1c637dae3330/215-monitor-lg-22mk600m-b-22mk600m-baruz/characteristics/',
    'https://www.dns-shop.ru/product/8bb0c208e55b3120/24-monitor-samsung-s24d300h-ls24d300hsiru/characteristics/',
    'https://www.dns-shop.ru/product/17d2e67b08378a5a/215-monitor-aoc-g2260vwq6/characteristics/',
    'https://www.dns-shop.ru/product/0cf8d0e818d93330/236-monitor-aoc-e2475pwj/characteristics/',
    'https://www.dns-shop.ru/product/16fa7363eb0f3330/235-monitor-samsung-s24f350fhi-ls24f350fhixci/characteristics/',
    'https://www.dns-shop.ru/product/d8cea2897e393330/236-monitor-philips-243v5lhab500/characteristics/',
    'https://www.dns-shop.ru/product/e46d8a8428ca3330/236-monitor-dell-se2417hg-2417-4336/characteristics/',
    'https://www.dns-shop.ru/product/9fb1fb540a2d3330/238-monitor-lg-24mk430h-24mk430h-baruz/characteristics/',
    'https://www.dns-shop.ru/product/7fd9c9d27db03330/238-monitor-lg-24mk600m-w-24mk600m-waruz/characteristics/',
    'https://www.dns-shop.ru/product/4942593d49b83330/235-monitor-samsung-c24f390fhi-lc24f390fhixru/characteristics/',
    'https://www.dns-shop.ru/product/2a97812b831c3330/24-monitor-samsung-s24d332h/characteristics/',
    'https://www.dns-shop.ru/product/9f216e94b56d3330/23-monitor-acer-sa230abi-umvs0eea01/characteristics/',
    'https://www.dns-shop.ru/product/5c06787125ba3330/24-monitor-acer-gaming-kg240bmiix/characteristics/',
    'https://www.dns-shop.ru/product/f453e10c73da8a5a/215-monitor-aoc-e2275pwqu/characteristics/',
    'https://www.dns-shop.ru/product/3644f1453f278a5a/215-monitor-viewsonic-vx2257-mhd-vs16261/characteristics/',
    'https://www.dns-shop.ru/product/af4ee19ad03c1b80/238-monitor-aoc-24v2q/characteristics/',
    'https://www.dns-shop.ru/product/7e5f844c741d3330/238-monitor-hp-24fw-3ks62aa/characteristics/',
    'https://www.dns-shop.ru/product/afcde733701c8a5a/24-monitor-aoc-g2460vq6/characteristics/',
    'https://www.dns-shop.ru/product/7e5f844b741d3330/238-monitor-hp-24f-2xn60aa/characteristics/',
    'https://www.dns-shop.ru/product/5eeafd5319be3330/238-monitor-lg-24mp59g-p-24mp59g-paruz/characteristics/'
];

let data = [];

const q = async.queue((url) => {
    needle.get(url, (err, res) => {
        if (err) throw(err);

        let modelObj = {
            model: "",
            mainColor: "",
            curvedScreen: "",
            screenDiagonal: "",
            maxResolution: "",
            matrixBacklightType: "",
            matrixManufacturingTechnology: "",
            aspectRatio: "",
            ready3D: "",
            touchScreen: "",
            screenCover: "",
            HDRSupport: "",
            visionProtectionTechnology: "",
            sizeVisibleAreaScreen: "",
            brightness: "",
            contrast: "",
            dynamicContrast: "",
            pixelResponseTime: "",
            verticalViewingAngle: "",
            horizontalViewingAngle: "",
            screenDynamicUpdateTechnology: "",
            pixelSize: "",
            pixelDensity: "",
            frequencyMaxResolution: "",
            maxScreenRefreshRate: "",
            videoConnectors: "",
            hubUSB: "",
            countUSBPorts: "",
            headphoneOut: "",
            pictureInPicture: "",
            framelessDesign: "",
            sizeVESA: "",
            swivelStand: "",
            heightAdjustment: "",
            tiltAdjustment: "",
            rotate90: "",
            builtInSpeakerSystem: "",
            powerSupplyLocation: "",
            powerConsumptionDuringOperation: "",
            powerConsumptionInSleepMode: "",
            equipment: "",
            specialFeatures: "",
            widthWithoutStand: "",
            heightWithoutStand: "",
            thicknessWithoutStand: "",
            weightWithoutStand: "",
            widthWithStand: "",
            minHeightWithStand: "",
            maxHeightWithStand: "",
            thicknessWithStand: "",
            weightWithStand: ""
        };

        const $ = cheerio.load(res.body);

        const tds = $(".table-params td:nth-child(2)");

        let i = 0;
        for (const [k] of Object.entries(modelObj)) {
            modelObj[k] = $(tds[i]).text();
            i++;
        }

        data.push(modelObj);
        console.log('DATA', data);

        fs.writeFile('data.json', JSON.stringify(data, null, 4), function (err) {
            if (err) console.error(err);
            else console.log('Data Saved to data.json file');
        });

    });
},10);

let i = 0;
while(urls.length > i) {
    q.push(urls[i]);
    i++;
}
