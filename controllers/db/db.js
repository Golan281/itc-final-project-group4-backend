// // const { nanoid } = require("nanoid");
// // const ID = nanoid();
// //maybe go with other ID type
// const { Tab } = require("../../models/mongooseModels/tabSchema");

// const path = `${__dirname}/db`;

// class DB {
//   constructor(tabName) {
//     this.tabName = tabName;
//     this.abPath = `${path}/${tabName}.json`;
//   }

//   createTab = async (tab) => {
//     const newTab = await Tab.create(tab);
//     return newTab;
//   };

//   getAllTabs = async () => {
//     const tabs = await Tab.find();
//     return tabs;
//   };

//   add = (item) => {
//     const data = this.get();
//     const newID = nanoid();
//     data.push({ ...item, id: newID });
//     this.save(data);
//     return newID;
//   };

//   getTabByID = async (id) => {
//     const tab = await Tab.findById(id);
//     return tab;
//   };

//   findTabs = (query) => {
//     const data = this.getAllTabs();
//     const item = data.find((i) => query(i));
//     return item;
//   };

//   findTabByQuery = async (query) => {
//     const tabs = await this.getAllTabs();
//     const queryResults = tabs.filter((item) => {
//       for (const [key, value] of Object.entries(query)) {
//         if (key === "ids") {
//           if (!value.includes(item.id)) {
//             return false;
//           }
//         } else if (item[key] !== value) {
//           return false;
//         }
//       }
//       return true;
//     });
//     return queryResults;
//   };

//   updateTab = async (id, item) => {
//     const data = await this.getAllTabs();
//     const index = data.findIndex((i) => i.id == id);
//     const curr = data[index];
//     data[index] = { ...item, id: curr.id };
//     this.save(data);
//   };

//   updateTabCol = async (id, data) => {
//     const [tab] = await Tab.find({ _id: id });
//     Object.assign(tab, { [data.key]: data.value });
//     await tab.save();
//   };

//   delete = (id) => {
//     const data = this.get();
//     const newData = data.filter((i) => i.id !== id);
//     this.save(newData);
//   };

//   save = (data) => {
//     fs.writeFileSync(this.tabPath, JSON.stringify(data));
//   };

//   get = () => {
//     const data = fs.readFileSync(this.tabPath, "utf-8");
//     return JSON.parse(data);
//   };

//   find = (query) => {
//     const data = this.get();
//     const item = data.find((i) => query(i));
//     return item;
//   };

//   create = () => {
//     this.save([]);
//   };
// }

// module.exports = DB;
