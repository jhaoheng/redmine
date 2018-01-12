#!/bin/bash

cd /usr/src/redmine/plugins
# projects_table
git clone git://github.com/denispeplin/redmine-projects-table.git projects_table


# lightbox2
git clone https://github.com/paginagmbh/redmine_lightbox2.git redmine_lightbox2
cd redmine_lightbox2 && git checkout redmine-3.3 && cd ..


# add plugins && please dont forget restart service to enable
rake redmine:plugins:migrate RAILS_ENV=production