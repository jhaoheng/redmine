
# troubleshooting

> 檢列出，曾經遇過的問題

## 執行 redmine 失敗

- 原因 : 在執行 `docker-compose up` 後，發現 redmine 主程式 crash
- 檢查 : 
	- db 的 table 沒有被建立起來
	- 原因是 在此 redmine 版本下的 configure.yml 格式錯誤

## 安裝 plugin 後失敗

- 原因 : 執行 Lightbox2 後，redmine 啟動失敗
- 檢查 : 
	- Lightbox2 的 branch 要切換到 redmine-3.3 的版本

## 匯出 db 資料的方法

- 請使用 phpmyadmin 的匯出功能