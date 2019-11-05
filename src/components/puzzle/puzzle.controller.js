export default class PuzzleController {

  constructor() {
    this.timer;
    this.help = false;
    this.ended = false;
    this.time = 0;
    this.startTimer();
    this.scrambleTiles();
  }

  /*--------------------------------------------------
  ## Scramble Tiles
  --------------------------------------------------*/

  scrambleTiles() {

    var tiles = document.getElementsByClassName('tile');
    var positions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    positions.sort(function (a, b) { return 0.5 - Math.random() });

    for (var i = 0; i < tiles.length; i++) {
      tiles[i].setAttribute('data-position', positions[i]);
      tiles[i].setAttribute('class', 'tile tile-position-' + positions[i]);
    }

    this.emptyTile = positions[i];
  }

  /*--------------------------------------------------
  ## Switch Tiles
  --------------------------------------------------*/

  switchTile(obj) {
    if (this.emptyTile != obj.target.attributes['data-position'].value && !this.ended) {
      if ((parseInt(obj.target.attributes['data-position'].value) + 1 == parseInt(this.emptyTile)
        && (this.emptyTile != '5' && this.emptyTile != '9' && this.emptyTile != '13'))
        || (parseInt(obj.target.attributes['data-position'].value) - 1 == parseInt(this.emptyTile)
          && (this.emptyTile != '4' && this.emptyTile != '8' && this.emptyTile != '12'))
        || parseInt(obj.target.attributes['data-position'].value) - 4 == parseInt(this.emptyTile)
        || parseInt(obj.target.attributes['data-position'].value) + 4 == parseInt(this.emptyTile)) {
        var currentEmptyTile = this.emptyTile;
        var futureEmptyTile = obj.target.attributes['data-position'].value;
        obj.target.attributes.class.value = 'tile tile-position-' + currentEmptyTile;
        obj.target.attributes['data-position'].value = currentEmptyTile;
        this.emptyTile = futureEmptyTile;
      }

      this.validatePuzzle();
    }
  }

  /*--------------------------------------------------
  ## Validate Puzzle
  --------------------------------------------------*/

  validatePuzzle() {
    var tiles = document.getElementsByClassName('tile');
    var count = 0;
    for (var i = 0; i < tiles.length; i++) {
      var current_position = tiles[i].getAttribute('data-position');
      var original_position = tiles[i].getAttribute('data-validation');
      if (current_position == original_position) {
        count++
        if (count == 15) {
          clearInterval(this.timer);
          this.ended = true;
        }
      }
    }
  }

  /*--------------------------------------------------
  ## Timer
  --------------------------------------------------*/

  secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? "h, " : "h, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "m, " : "m, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.getElapsedTime()
    }, 1000);
  }

  getElapsedTime() {
    this.time += 1;
    document.getElementById('counter').innerHTML = this.secondsToHms(this.time)
  }

  /*--------------------------------------------------
  ## Help
  --------------------------------------------------*/
  toggleHelp() {
    this.help = !this.help;
  }
}