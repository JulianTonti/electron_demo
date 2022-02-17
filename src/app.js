const electron = require('electron');
const fs = require('fs');

const gid = document.getElementById.bind(document);
const els = {
  text : 'mermaid_text',
  plot : 'mermaid_plot',
  info : 'mermaid_info',
  load : 'mermaid_load',
  save : 'mermaid_save',
  exec : 'mermaid_exec',
};
function error(e) {
  if (!e) return;
  console.error(e);
  alert("The following error has occurred: " + e.message);
  els.info.innerText = e.message;
}
function update(s) {
  if (s) els.text.value = s;
  try {
    els.plot.innerHTML = window.mermaid?.render('mermaid_tmp', els.text.value);
    els.plot.firstChild.removeAttribute('height'); // fix for mermaid quirk
  }
  catch (e) { error(e); }
}
async function load_file() {
  let [ifile] = await electron.ipcRenderer.invoke('dialog', 'showOpenDialogSync', {});
  if (!ifile) return;
  els.info.innerText = 'Loaded: ' + ifile;
  fs.readFile(ifile, 'utf-8', (e,d) => e ? error(e) : update(d.toString()));
}
async function save_file() {
  let ofile = await electron.ipcRenderer.invoke('dialog', 'showSaveDialogSync', {});
  if (!ofile) return;
  els.info.innerText = 'Saved: ' + ofile;
  fs.writeFile(ofile, els.text.value, e => error(e));
}
function init(browser_window) {
  window.mermaid = browser_window.mermaid;
  for (let [k,v] of Object.entries(els)) {
    els[k] = gid(v);
  }
  els.load.onclick = load_file;
  els.save.onclick = save_file;
  els.exec.onclick = () => update();
  update(`graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;`)
}

// custom API that can be exposed to the rendered window, bridging to Node
electron.contextBridge.exposeInMainWorld('app',{init});
