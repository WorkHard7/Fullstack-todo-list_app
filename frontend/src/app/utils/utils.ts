export class Utils {
  setLowerOpacity() {
    document.body.classList.add('loading-overlay');
  }

  resetOpacity() {
    document.body.classList.remove('loading-overlay');
  }
}
