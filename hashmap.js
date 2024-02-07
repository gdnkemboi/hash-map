class HashMap {
  constructor() {
    this.map = new Array(16);
    this.hashMax = this.map.length;

    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.hashMax;
  }

  set(key, value) {
    // Takes two arguments: a key and a value. If a key already exists, then the old value is overwritten

    const index = this.hash(key);
    if (this.has(key)) {
      this.remove(key);
    }
    this.map[index].append([key, value]);
  }

  get(key) {
    // Takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null

    const index = this.hash(key);
    if (this.map[index].at(key)) {
      return this.map[index].at(key)[1];
    }
    return null;
  }

  has(key) {
    // Takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    const index = this.hash(key);
    return this.map[index].contains(key);
  }

  remove(key) {
    // Takes a key as an argument. If key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
    const index = this.hash(key);
    this.map[index].removeAt(key);
  }

  length() {
    // Returns the number of stored keys in the hash map

    let count = 0;
    for (let i = 0; i < this.map.length; i++) {
      count += this.map[i].size();
    }
    return count;
  }

  clear() {
    // Removes all entries in the hash map

    for (let i = 0; i < this.map.length; i++) {
      this.map[i] = new LinkedList();
    }
  }

  keys() {
    // Returns an array containing all the keys inside the hash map

    const keys = [];
    for (let i = 0; i < this.map.length; i++) {
      let currentNode = this.map[i].head;
      while (currentNode) {
        keys.push(currentNode.value[0]);
        currentNode = currentNode.nextNode;
      }
    }
    return keys;
  }

  values() {
    // Returns an array containing all the values inside the hash map

    const values = [];
    for (let i = 0; i < this.map.length; i++) {
      let currentNode = this.map[i].head;
      while (currentNode) {
        values.push(currentNode.value[1]);
        currentNode = currentNode.nextNode;
      }
    }
    return values;
  }

  entries() {
    // Returns an array that contains each key, value pair

    const entries = [];
    for (let i = 0; i < this.map.length; i++) {
      let currentNode = this.map[i].head;
      while (currentNode) {
        entries.push(currentNode.value);
        currentNode = currentNode.nextNode;
      }
    }
    return entries;
  }
}

class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (this.head === null) {
      this.head = newNode;
      return;
    }

    let currentNode = this.head;
    while (currentNode.nextNode) {
      currentNode = currentNode.nextNode;
    }

    currentNode.nextNode = newNode;
  }

  prepend(value) {
    let currentNode = this.head;
    this.head = new Node(value, currentNode);
  }

  size() {
    let count = 0;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      currentNode = currentNode.nextNode;
    }
    return count;
  }

  getHead() {
    return this.head.value;
  }

  tail() {
    let currentNode = this.head;
    while (currentNode) {
      if (!currentNode.nextNode) {
        return currentNode.value;
      }
      currentNode = currentNode.nextNode;
    }
  }

  at(index) {
    let counter = 0;
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value[0] === index) {
        return currentNode.value;
      }
      counter++;
      currentNode = currentNode.nextNode;
    }
    return null;
  }

  pop() {
    let previousNode;
    let currentNode = this.head;
    while (currentNode) {
      if (!currentNode.nextNode) {
        previousNode.nextNode = null;
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value[0] === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  find(value) {
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return count;
      }
      currentNode = currentNode.nextNode;
      count++;
    }
    return null;
  }

  toString() {
    let string = "";
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode) {
        string = string.concat(`( ${currentNode.value} ) -> `);
      }

      currentNode = currentNode.nextNode;
    }
    string = string.concat("null");
    return string;
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const newNode = new Node(value);
    let count = 0;
    let previousNode;
    let currentNode = this.head;

    while (currentNode) {
      if (count === index) {
        previousNode.nextNode = newNode;
        newNode.nextNode = currentNode;
        return;
      }
      previousNode = currentNode;
      currentNode = currentNode.nextNode;
      count++;
    }
  }

  removeAt(index) {
    if (this.size() === 1) {
      this.head = null;
      return;
    }
    let previousNode;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value[0] === index && previousNode) {
        previousNode.nextNode = currentNode.nextNode;
        return;
      } else if (currentNode.value[0] === index && !previousNode) {
        this.head = currentNode.nextNode;
        return;
      }

      previousNode = currentNode;
      currentNode = currentNode.nextNode;
    }
  }
}

let numbers = new HashMap();
numbers.set(1, 1);
numbers.set(3, 3);
numbers.set(4, 4);
numbers.set(5, 5);
numbers.set(1, 1);
numbers.set(1, 1);
numbers.set(2, 2);
numbers.set(4, 4);
numbers.set(4, 4);
console.log(numbers.entries());