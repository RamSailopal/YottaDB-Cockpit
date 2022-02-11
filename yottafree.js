const yottatab = document.getElementById("yottatab");
const yottatab1 = document.getElementById("yottatab2");
const yottatab2 = document.getElementById("yottatab3");
const yottatab3 = document.getElementById("yottatab4");
const yottatab4 = document.getElementById("yottatab5");
const button = document.getElementById("refresh");

function yottafree_run() {
    var rowCount = yottatab1.rows.length;
    for (var i = rowCount; i > 1; i--) {
       yottatab1.deleteRow(i-1);
    }
    var rowCount = yottatab.rows.length;
    for (var i = rowCount; i > 1; i--) {
       yottatab.deleteRow(i-1);
    }
    var rowCount = yottatab2.rows.length;
    for (var i = rowCount; i > 1; i--) {
       yottatab2.deleteRow(i-1);
    }
    var rowCount = yottatab3.rows.length;
    for (var i = rowCount; i > 1; i--) {
       yottatab3.deleteRow(i-1);
    }
    var rowCount = yottatab4.rows.length;
    for (var i = rowCount; i > 1; i--) {
       yottatab4.deleteRow(i-1);
    }



    cockpit.spawn(["/bin/bash", "-c", "/usr/share/cockpit/yottadb/freecnt.sh"])
        .stream(yottafree_output)
    cockpit.spawn(["/bin/bash", "-c", "/usr/share/cockpit/yottadb/yottaprocs.sh"])
        .stream(yottaproc_output)
    cockpit.spawn(["/bin/bash", "-c", "/usr/share/cockpit/yottadb/openports.sh"])
        .stream(yottaports_output)
    cockpit.spawn(["/bin/bash", "-c", "/usr/share/cockpit/yottadb/journfiles.sh"])
        .stream(yottajourn_output)
    cockpit.spawn(["/bin/bash", "-c", "/usr/share/cockpit/yottadb/locks.sh"])
        .stream(yottalocks_output)

}

function remlock_output(data) {
   console.log(data);
}

function remlock_fail(data) {
   console.log(data);
}


function remlock(pid) {
	cockpit.spawn(["/bin/bash", "-c", "/usr/share/cockpit/yottadb/clearlock.sh " + pid])
        .stream(remlock_output)
        .catch(remlock_fail)


}

function yottaports_output(data) {
    portlines=data.split("\n");
    for (i=0;i<portlines.length;i++) {
       var row = yottatab2.insertRow(1);
       var row = yottatab2.rows[1];
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       var cell4 = row.insertCell(3);
       const portarray = portlines[i].split(":");
       cell1.innerHTML=portarray[0];
       cell2.innerHTML=portarray[1];
       cell3.innerHTML=portarray[2];
       cell4.innerHTML=portarray[3];
    }
}


function yottalocks_output(data) {
    locklines=data.split("\n");
    for (i=0;i<locklines.length;i++) {
       var row = yottatab4.insertRow(1);
       var row = yottatab4.rows[1];
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       if (locklines[i] != "") {
          const lockarray = locklines[i].split(":");
          cell1.innerHTML=lockarray[0];
          cell2.innerHTML=lockarray[1];
          cell3.innerHTML="<input type=\"button\" value=\"Remove\" id=\"lock" + i + "\"'/>";
          document.getElementById('lock'+i).addEventListener("click", function() {  remlock(lockarray[1]); 
    setTimeout(() => { button.click(); }, 1000);

});
       }
    }
}


function yottajourn_output(data) {
    const journlines=data.split("\n");
    for (i=0;i<journlines.length;i++) {
       var row = yottatab3.insertRow(1);
       var row = yottatab3.rows[1];
       var cell1 = row.insertCell(0);
       var cell2 = row.insertCell(1);
       var cell3 = row.insertCell(2);
       if (journlines[i] != "") {
          const journarray = journlines[i].split("@");
          cell1.innerHTML=journarray[0];
          cell2.innerHTML=journarray[1];   
          cell3.innerHTML=journarray[2];
       }
     }
}


function yottafree_output(data) {
    var row = yottatab.insertRow(1);
    var row = yottatab.rows[1];
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    const freearray = data.split(":");
    cell1.innerHTML=freearray[0];
    cell2.innerHTML=freearray[1];
    cell3.innerHTML=freearray[2];
    cell4.innerHTML=freearray[3];
    cell5.innerHTML=freearray[4];
}


function yottaproc_output(data) {
    if (data.substring(0,3)=="PID") {
       return;
    }
    var row = yottatab1.insertRow(1);
    const procarray = data.split("\n");
    var arrayLength = procarray.length-1;
    for (var i = 0; i < arrayLength; i++) {
       const procarray1 = procarray[i].split("#");
       var cell1=row.insertCell(0);
       cell1.innerHTML=procarray1[0];
       var cell2=row.insertCell(1);
       cell2.innerHTML=procarray1[1];
       var cell3=row.insertCell(2);
       cell3.innerHTML=procarray1[2];
       var cell4=row.insertCell(3);
       cell4.innerHTML=procarray1[3];
       var cell5=row.insertCell(4);
       cell5.innerHTML=procarray1[4];
       var cell6=row.insertCell(5);
       cell6.innerHTML=procarray1[5];
       var cell7=row.insertCell(6);
       cell7.innerHTML=procarray1[6];
       var cell8=row.insertCell(7);
       cell8.innerHTML=procarray1[7];
       var cell9=row.insertCell(8);
       cell9.innerHTML=procarray1[8];
       var cell10=row.insertCell(9);
       cell10.innerHTML=procarray1[9];
       var cell11=row.insertCell(10);
       cell11.innerHTML=procarray1[10];





    }
}


// Connect the button to starting the "ping" process
button.addEventListener("click", yottafree_run);

document.addEventListener('DOMContentLoaded', yottafree_run);

// Send a 'init' message.  This tells integration tests that we are ready to go
cockpit.transport.wait(function() { });
