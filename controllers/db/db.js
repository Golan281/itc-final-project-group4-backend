// const { nanoid } = require("nanoid");
// const ID = nanoid();
//maybe go with other ID type
const { Tab } = require("../../models/mongooseModels/tabSchema");
const { Workspace } = require("../../models/mongooseModels/workspaceSchema");
const { UserSchema } = require("../../models/mongooseModels/userSchema");

class DB {
  createTab = async (tab) => {
    const newTab = await Tab.create(tab);
    return newTab;
  };

  createWorkspace = async (workspace) => {
    const newWorkspace = await Workspace.create(workspace);
    return newWorkspace;
  };

  getAllWorkspace = async () => {
    const workspaces = await Workspace.find();
    return workspaces;
  };

  getUserById = async (id) => {
    const user = await UserSchema.findById(id);
    return user;
  };

  getAllTabs = async () => {
    const tabs = await Tab.find();
    return tabs;
  };

  getTabByID = async (id) => {
    const tab = await Tab.findById(id);
    return tab;
  };

  getWorkspaceByID = async (id) => {
    const workspace = await Workspace.findById(id);
    return workspace;
  };

  findTabByQuery = async (query) => {
    const tabs = await this.getAllTabs();
    const queryResults = tabs.filter((item) => {
      for (const [key, value] of Object.entries(query)) {
        if (key === "ids") {
          if (!value.includes(item.id)) {
            return false;
          }
        } else if (item[key] !== value) {
          return false;
        }
      }
      return true;
    });
    return queryResults;
  };

  updateTab = async (id, item) => {
    const data = await this.getAllTabs();
    const index = data.findIndex((i) => i.id == id);
    const curr = data[index];
    data[index] = { ...item, id: curr.id };
    this.save(data);
  };

  updateTabCol = async (id, data) => {
    const [tab] = await Tab.find({ _id: id });
    Object.assign(tab, { [data.key]: data.value });
    await tab.save();
  };
}

module.exports = DB;
