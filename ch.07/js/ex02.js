class Group {
  constructor(x, y) {
    this.arrSet = [];
    //   for (let i = x; i <= y; i++) {
    //     this.arrSet.push(i);
    //   }

    //   console.log(`x:${x}, y:${y}`);
  }

  /* this is test for git */
  static from(inArr) {
    // console.log(`inRange:${inArr}`);

    // let x = Math.min(...inArr);
    // let y = Math.max(...inArr);

    // // for (let i = Math.min(inRange); i <= Math.max(inRange); i++) {
    // //   this.arrSet.push(i);
    // // }
    // console.log(`from: x:${x}, y:${y}`);
    let group = new Group();

    for (let putArr of inArr) {
      group.arrSet.push(putArr);
    }
    return group;
  }

  has(inValue) {
    return this.arrSet.includes(inValue);
  }

  add(inValue) {
    if (!this.has(inValue)) {
      this.arrSet.push(inValue);
    }
  }

  delete(inValue) {
    this.arrSet = this.arrSet.filter(o => o != inValue);
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}
