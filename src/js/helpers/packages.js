import $ from 'jquery';

const items = $('.package > .package-list > .package-list-item'); // packages
const commonSpan = `<span class="package-list-item-disc"></span>✔️</span>`;

export function redrawPackagesForTablets() {
    items[3].innerHTML = `${commonSpan} тишина
  и незабываемые виды`;
    items[5].innerHTML = `${commonSpan} скважина с питьевой водой`;
    items[7].innerHTML = `${commonSpan} аренда деревянной усадьбы
  <div class="second-row">(2 спальни, камин, пруд)</div>`;
    items[8].innerHTML = `${commonSpan} экологически чистое место`;
    items[11].innerHTML = `${commonSpan} прогулки по местности, <div class="second-row">фотографирование</div>`;
    items[12].innerHTML = `${commonSpan} мангалы для шашлыков, <div class="second-row">беседки</div>`;
    items[14].innerHTML = `${commonSpan} скважина с питьевой водой`;
}

export function removePackagesDisk() {
    for (let item of items) {
        const text = item.innerText;
        item.innerHTML = text.substr('✔️'.length);
    }
}

export function redrawPackagesForSmallSmartphones() {
    items[0].innerHTML = `рыбалка в клевом месте`;
    items[3].innerHTML = `тишина и незабываемые виды`;
    items[5].innerHTML = `скважина с питьевой водой`;
    items[7].innerHTML = `8 спальных мест, камин`;
    items[8].innerHTML = `экологически чистое место`;
    items[11].innerHTML = `прогулки по местности`;
    items[12].innerHTML = `мангалы и беседки`;
    items[14].innerHTML = `скважина с питьевой водой`;
}

export function redrawPackageHeader() {
    const items = $('.package .package-header h3, .package .package-header h3');
    for (let item of items) {
        const text = item.innerText;
        const textItems = text.split('-');
        item.innerHTML = `<h3 style="text-align: center; margin-bottom: 0.5rem;">${textItems[0]}</h3>
        <h3 style="text-align: center" class="text-danger">${textItems[1]}</h3>`;
    }
}
