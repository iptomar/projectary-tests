var exec = require('child_process').exec;
var chalk = require('chalk');

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
