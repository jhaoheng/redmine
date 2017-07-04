# how to use

1. docker-compose build
    - 若要開啟 email(google) 寄送功能，填寫 configuration.yml，設定好帳號密碼
2. docker-compose up -d 
    - 等待約 3 分鐘，redmine 會被建立起來
    - 執行 plugin 環境設定 : `docker exec redmine-main rake redmine:plugins:migrate RAILS_ENV=production`
        - 若無執行環境設定，會造成某些功能錯誤
3. 第一次登入，會要求 admin 更新密碼，密碼長度請超過 8 碼
4. 可至設定中，更新 theme
5. 可至設定中，測試 mail 寄送

## docker container
1. mysql
    - 預設為 utf-8
2. redmine
    - localhost:2000
    - admin/admin
3. phpmyadmin
    - localhost:2001
    - root/root

## redmine 已加入的 plugin
- [Project Table](http://www.redmine.org/plugins/projects_table)  
- [Redmine Lightbox2](https://github.com/paginagmbh/redmine_lightbox2)
- [Attach image from clipboard](http://www.redmine.org/plugins/clipboard_image_paste)
- [redmine_checklists](http://www.redminecrm.com/projects/checklist/pages/1)
- [sidebar_hide](https://github.com/bdemirkir/sidebar_hide)

![img](./plugins.png)