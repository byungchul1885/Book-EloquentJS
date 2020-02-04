var roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall"
];

function buildGraph(edges) {
  // let graph = Object.create(null);
  let graph = {};

  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  // console.table(edges.map(r => r.split("-")));

  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  console.table(graph);

  return graph;
}

var roadGraph = buildGraph(roads);

var VillageState = class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;

    console.group("VillageState constructor");
    console.log(`place:${place}, `, "parcels:", parcels);
    console.groupEnd();
  }

  move(destination) {
    console.group("VillageState.move()");
    console.log("place:", this.place, ", destination:", destination);

    if (!roadGraph[this.place].includes(destination)) {
      console.log("no route. return this");
      return this;
    } else {
      let parcels = this.parcels
        .map((p, index) => {
          if (p.place != this.place) {
            // this parcel is not here
            console.log(`parcel ${index}: ${p.place}`);
            return p;
          } else {
            // moving this parcel to next place
            console.log(`parcel ${index}: ${p.place}->${destination}`);
            return {
              place: destination,
              address: p.address
            };
          }
        })
        .filter((p, index) => {
          if (p.place != p.address) {
            return true;
          } else {
            console.log(`parcel #${index}: delivered to ${p.place}`);
            return false;
          }
        });

      console.groupEnd();
      return new VillageState(destination, parcels);
    }
  }
};

function runRobot(villageState, robotFunc, memory) {
  for (let turn = 0; ; turn++) {
    if (villageState.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }

    let action = robotFunc(villageState, memory);
    memory = action.memory;

    villageState = villageState.move(action.direction);
    // console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(dirGraphArr) {
  let choice = Math.floor(Math.random() * dirGraphArr.length);
  return dirGraphArr[choice];
}

function randomRobot(villageState) {
  return { direction: randomPick(roadGraph[villageState.place]) };
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];

  for (let i = 0; i < parcelCount; i++) {
    let dstAddr = randomPick(Object.keys(roadGraph));
    let srcPlace;
    do {
      srcPlace = randomPick(Object.keys(roadGraph));
    } while (srcPlace == dstAddr);
    parcels.push({ place: srcPlace, address: dstAddr });
  }

  console.table(parcels);

  return new VillageState("Post Office", parcels);
};

var mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office"
];

function routeRobot(state, routeMem) {
  if (routeMem.length == 0) {
    console.group("routeRobot");
    console.log(`memory empty->fill`);
    console.groupEnd();

    routeMem = mailRoute;
  }
  return { direction: routeMem[0], memory: routeMem.slice(1) };
}

function findRoute(graph, from, to) {
  console.group("findRoute");
  console.log(`from:${from}, to:${to}`);

  let work = [{ at: from, route: [] }];

  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];

    for (let place of graph[at]) {
      if (place == to) {
        console.groupEnd();
        return route.concat(place);
      }
      if (!work.some(w => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
        console.log(`add:${place}`);
        console.log(route);
      }

      // console.log(work);
    }
  }
}

// function goalOrientedRobot({ place, parcels }, routeMem) {
//   if (routeMem.length == 0) {
//     let parcel = parcels[0];
//     if (parcel.place != place) {
//       routeMem = findRoute(roadGraph, place, parcel.place);
//     } else {
//       routeMem = findRoute(roadGraph, place, parcel.address);
//     }
//   }
//   return { direction: routeMem[0], memory: routeMem.slice(1) };
// }

function goalOrientedRobot(villageState, routeMem) {
  if (routeMem.length == 0) {
    let firstParcel = villageState.parcels[0];

    if (firstParcel.place == villageState.place) {
      routeMem = findRoute(roadGraph, villageState.place, firstParcel.address);
    } else {
      routeMem = findRoute(roadGraph, villageState.place, firstParcel.place);
    }
  }
  return { direction: routeMem[0], memory: routeMem.slice(1) };
}
