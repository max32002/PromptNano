const SPREADSHEET_ID = '1wkofaY6opdd61og2kQattTLGf_jYjm7KVMm1mal2ZIA';
const FOLDER_ID = '1vyGW_Fpcgb2Iwgog2rG0bLmX7JhO5iKY';

function doGet() {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('AI靈感資料庫') // 修改這裡：網頁標題
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function authorizeDrive() {
  DriveApp.getRootFolder();
  const folder = DriveApp.getFolderById(FOLDER_ID);
}

function testFolderWrite() {
  const folder = DriveApp.getFolderById(FOLDER_ID);
  const f = folder.createFile('permission_test.txt', 'ok');
  Logger.log(f.getId());
}


// 取得資料
function getPhotoData() {
  const sheet = getOrCreatePhotosSheet_();
  
  if (sheet.getLastRow() <= 1) {
    return [];
  }

  const rows = sheet.getDataRange().getValues();
  const data = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row[0]) continue;

    // --- 關鍵修改 ---
    // 檢查 row[1] 是否存在，存在就轉成字串，避免日期物件導致回傳 null
    let timeStr = "";
    try {
        timeStr = row[1] ? row[1].toString() : "";
    } catch(e) {
        timeStr = "";
    }
    // ----------------

    data.push({
      id: row[0],
      timestamp: timeStr, // 改用轉過型的字串
      title: row[2],
      desc: row[3],
      tags: row[4],
      imageId: row[5],
      url: row[6]
    });
  }
  return data.reverse(); 
}

function debugPhotoRead() {
  // 1. 確認讀到的檔案對不對
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  Logger.log('------------------------------------------------');
  Logger.log('1. 成功開啟試算表：' + ss.getName());
  Logger.log('   (請確認這是不是你正在看的那份檔案)');

  // 2. 確認分頁名稱
  const targetSheetName = 'Photos'; // 程式指定的名稱
  const sheet = getOrCreatePhotosSheet_();

  if (!sheet) {
    Logger.log('2. ❌ 嚴重錯誤：找不到名為 [' + targetSheetName + '] 的分頁！');
    Logger.log('   目前的試算表裡有哪些分頁：');
    const allSheets = ss.getSheets();
    allSheets.forEach(s => Logger.log('   - ' + s.getName()));
    Logger.log('   解決方法：請把資料所在的分頁改名為 Photos (大小寫要一樣)');
    return;
  } else {
    Logger.log('2. ✅ 成功找到分頁：' + targetSheetName);
  }

  // 3. 確認資料範圍
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  Logger.log('3. 分頁狀態偵測：');
  Logger.log('   - 總列數 (LastRow): ' + lastRow);
  Logger.log('   - 總欄數 (LastCol): ' + lastCol);

  if (lastRow <= 1) {
    Logger.log('   ⚠️ 警告：程式認為只有標題或完全沒資料');
    return;
  }

  // 4. 試讀第一筆資料
  const data = sheet.getRange(2, 1, 1, lastCol).getValues(); // 讀第2列 (第一筆資料)
  Logger.log('4. 試讀第 2 列 (第一筆資料) 的內容：');
  Logger.log('   ' + JSON.stringify(data[0]));
  Logger.log('------------------------------------------------');
}

function getOrCreatePhotosSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Photos');
  if (!sheet) {
    sheet = ss.insertSheet('Photos');
    sheet.appendRow(['id', 'timestamp', 'title', 'desc', 'tags', 'fileId', 'url']);
  }
  return sheet;
}

// 上傳功能維持不變
function uploadPhoto(formObject) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const sheet = getOrCreatePhotosSheet_();

    // 1. 取得上傳的檔案物件
    const blob = formObject.imageFile;
    
    // 2. 製作新檔名：加上時間戳記 (例如：20251230_153022_原本檔名.jpg)
    // 這樣能確保檔名不重複，又能看出是什麼時候傳的
    const originalName = blob.getName();
    const timePrefix = Utilities.formatDate(new Date(), "GMT+8", "yyyyMMdd_HHmmss");
    const newFileName = timePrefix + "_" + originalName;
    
    // 3. 設定新檔名
    blob.setName(newFileName);

    // 4. 建立檔案 (這時候檔名已經變了)
    const file = folder.createFile(blob);

    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const fileId = file.getId();
    const viewUrl = "https://lh3.googleusercontent.com/d/" + fileId;
    
    const timestamp = new Date();
    const id = Utilities.getUuid();

    // 定義轉換函數，簡體轉繁體
    const toTC = (text) => text ? LanguageApp.translate(text, 'zh-CN', 'zh-TW') : "";

    // 將資料轉換為繁體
    const titleTC = toTC(formObject.title);
    const descTC = toTC(formObject.desc);
    const tagsTC = toTC(formObject.tags);
    
    sheet.appendRow([
      id,
      timestamp,
      titleTC,
      descTC,
      tagsTC,
      fileId,
      viewUrl
    ]);
    
    return { success: true };
    
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}


// 刪除照片功能
function deletePhoto(id) {
  const sheet = getOrCreatePhotosSheet_();
  const data = sheet.getDataRange().getValues();
  
  let rowIndex = -1;
  let fileId = '';
  
  // 遍歷尋找對應 ID 的資料 (跳過標題列)
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) { // 第 0 欄是 ID
      rowIndex = i + 1; // 陣列索引 + 1 = 試算表列號
      fileId = data[i][5]; // 第 5 欄是圖片檔案 ID
      break;
    }
  }
  
  if (rowIndex > 0) {
    try {
      // 1. 從 Google Drive 刪除 (移至垃圾桶)
      if (fileId) {
        try {
          DriveApp.getFileById(fileId).setTrashed(true);
        } catch (driveError) {
          // 如果檔案已經不存在，記錄錯誤但繼續刪除 Sheet 資料
          console.log('Drive file delete error: ' + driveError);
        }
      }
      
      // 2. 從 Google Sheet 刪除該行
      sheet.deleteRow(rowIndex);
      
      return { success: true };
    } catch (e) {
      return { success: false, error: e.toString() };
    }
  } else {
    return { success: false, error: '找不到該筆資料，可能已被刪除。' };
  }
}
