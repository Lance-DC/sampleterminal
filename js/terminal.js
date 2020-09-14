/* termWidth and termHeight should be either string "100%" or numeric px value (e.g. var termWidth = 800)
*/
var termWidth = "100%"; 
var termHeight = "100%";
var startInstr = "Please elevate to root. If you need assistance, enter: help";
var termGreeting = "Sample Terminal\n\n\n" + startInstr + "\n\n";
const startPrompt = "user@server $ ";
const rootPrompt = "[[;red;]root@server # ]";
const logoutPrompt = "";
var isRoot = false;
const helpText = "[[;yellow;]\nThe following commands are used in this simulation:\n\nhelp\nhint\nsudo su\nexit\n\n]"
$("body").terminal(
  {
    sudo: function (su) {
      if (su != "su") {
        this.echo("\n[[;red;]### Incorrect argument. Please try again. ###]\n");
      } else {
        this.set_prompt(function (set_prompt) {
          set_prompt(rootPrompt);
          isRoot = true;
        });
      }
    },
    hint: function () {
      if (isRoot == false) {
        this.echo("\n[[;yellow;]### Try: sudo su ###]\n");
      } else {
          this.echo("\n[[;yellow;]### Try: exit ###]\n");
      }
    },
      exit: function () {
      if (isRoot == true) {
         isRoot = false;
          this.set_prompt(function (set_prompt) {
          set_prompt(startPrompt); 
      });
      } else {
         this.echo("logout");
          this.set_prompt(function (set_prompt) {
          set_prompt(logoutPrompt); 
      }); 
      }
    },
    help: function () {
      this.echo(helpText);
    },
/*
    newCommand: function () {
      //function code
    },
*/
  },
    //end of commands
    //initial settings
  {
    greetings:
      termGreeting,
    prompt: startPrompt,
    width: termWidth,
    height: termHeight,
  }
);
