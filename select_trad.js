
browser.contextMenus.create({
    id: "translate",
    title: "translate",
    contexts: ["selection"]
});

browser.runtime.onMessage.addListener(updateMenu);


function getFirstWord(str) {
    let str_result = str.trim()
    let word = str_result.split(/\s|!|\(|\)|_|,|\.|;|:|'|"/)[0];

    if (word.length > 0) {
            return word;
    } else {
            console.log("[select_trad.js] getFirstWord: empty string");
            return "";
    }
}

function updateMenu(message) {
    
    let text = getFirstWord(message.selection);
    browser.contextMenus.update("translate", {
           title: "translate: \"" + text + "\""});
    console.log("[select_trad.js] updateMenu: " + text);
    browser.contextMenus.refresh();
}

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translate") {
            
            let text = getFirstWord(info.selectionText);
            console.log("[select_trad.js] onClicked: " + text);
            let wordrefUrl = "https://www.wordreference.com/enit/"+text+"";
           
            browser.tabs.create({
                    url: wordrefUrl
            });
    }
})