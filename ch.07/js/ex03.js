class GroupIterator {
  constructor(group) {
    this.currIdx = 0;
    this.group = group;

    console.log(`a:${this.group.arrSet.length}`); /* test for git */
  }

  next() {
    // test
    if (this.currIdx === this.group.arrSet.length) {
      return { done: true };
    } else {
      return { value: this.group.arrSet[this.currIdx++], done: false };
    }
  }
}
