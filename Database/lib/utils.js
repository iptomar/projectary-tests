var exec = require('child_process').exec;
var chalk = require('chalk');
var path = require("path");


class Utils {

	
  /**
   * Used to decide if user is a student or a teacher(1-2)
   */
  genType() {
    var rng = Math.random();
    if (rng < 0.5) { return 1; }
    else { return 2; }
  }

  /**
   * Generate a password
   */
  genPass(passLength) {
    var alphaNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var pass = "";
    for (var i = 0; i < passLength; i++) {
      var j = Math.floor(Math.random() * alphaNum.length);
      pass += alphaNum.charAt(j);
    }
    return pass;
  }

	
	//Parses process.hrtime to HH:MM:SS.nano notation
	parseHrTime(hrtime) {
		var sec_num = parseInt(hrtime[0], 10); // don't forget the second param
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);
		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds+'.'+hrtime[1];
	}
	
	//async returns on an array 'fnames' all the files within a given path 'p' with the extension 'ext' 
	getScripts(p,ext,fnames){
	var fs = require('fs');
	var fsRead = Promise.defer();
	fs.readdir(p, function (err, files) {

		if (err) {
			throw err;
		}

		files.map(function (file) {
			return path.join(p, file);
		}).filter(function (file) {
			return fs.statSync(file).isFile();
		}).forEach(function (file) {
			if(path.extname(file) === ext)
			fnames.push(file);
			fsRead.resolve();
		});
		});
		return fsRead.promise;
	}

	
	//appends new line 'data' to 'logfile'. Creates if does not exist
	writeLog(logfile, data) {
		var fs = require('fs');
		var today = new Date();
		var yyyy = today.getFullYear();
		var mo= today.getMonth()+1; 
		var dd = today.getDate();
		var hh = today.getHours();
		var mm = today.getMinutes();
		var ss = today.getSeconds();
		if(dd<10) {	dd='0'+dd; } 
		if(mm<10) {	mm='0'+mm; } 
		if(mo<10) {	mo='0'+mo; } 
		if(hh<10) {	hh='0'+hh; } 
		if(ss<10) {	ss='0'+ss; }
		var timestamp = yyyy + "-" + mo + "-" + dd + " " + hh + ":" + mm + ":" + ss;   	
		fs.appendFile(logfile+"", timestamp + " - " + data + "\r\n", function (err) {
			if (err) throw err;
		});
	}

	
  /**
   * Turn the child_process.exec() into a promise to be used on async/await
   */
  execPromise(cmd) {
    return new Promise(function (resolve, reject) {
      exec(cmd, { stdio: [0, 1, 2] }, (error, stdout, stderr) => {
        // if stderr is empty then there's no error 
        if (!error) {
          resolve(stdout);
        } else {
          reject(new Error(error.message));
        }
      });
    });
  }

  /**
   * Helper method to be used when testing cli commands with execPromise()
   * command - argument to use on execPromise(command)
   * successMsg - success string message
   * failedMsg - failed string message
   */
  async cmd(command, successMsg, failedMsg) {
    try {
      await this.execPromise(command);
      this.log('success', successMsg);
    } catch (error) {
      this.log('fail', failedMsg + '\n' + error.message);
      throw new Error(error.message);
    }
  }

  /**
   * Method to prepend testing label (icon and status) to a message
   * status - 'success', 'fail' or 'warning' - testing status of the message
   * msg - message to print
   */
  async log(status, msg) {
    var successLabel = chalk.green.bold('\SUCCESS ');
    var failedLabel = chalk.red.bold('FAIL ');
    var warningLabel = chalk.yellow.bold('WARNING ');
    switch (status) {
      case 'success':
        console.log(successLabel + msg);
        break;
      case 'fail':
        console.error(failedLabel + msg);
        break;
      case 'warning':
        console.log(warningLabel + msg);
        break;
      default:
        break;
    }
  }
}

module.exports = Utils;
