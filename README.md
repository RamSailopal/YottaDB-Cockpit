# YottaDB-Cockpit

A YottaDB dashboard plugin for Linux Cockpit

![Alt text](yottadb-cockpit\ [MConverter.eu].webp?raw=true "YottaDB Cockpit")

# Features

Database Free Count

YottaDB Process

Journal file list and size

YottaDB active network ports

Database lock list and release options

# Installation

Assuming working Cockpit and YottaDB installations:

Clone this repo:
    
    cd /usr/local
    git clone https://github.com/RamSailopal/YottaDB-Cockpit.git
    cd /usr/local/YottaDB-Cockpit

Amend the file envfile and set the variable **yotta_inst** to the directory where the executable **ydb** is installed

Stop Cockpit:

    sudo systemctl stop cockpit
    
 Setup the YottaDB plugin directory:
 
    mkdir /usr/share/cockpit/yottadb
    cp /usr/local/YottaDB-Cockpit/* /usr/share/cockpit/yottadb/

Restart Cockpit:

    sudo systemctl start cockpit
