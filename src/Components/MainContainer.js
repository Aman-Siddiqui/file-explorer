import React, { useState } from "react";

const MainContainer = () => {
  const [data, setData] = useState([
    {
      name: "Documents",
      type: "folder",
      children: [
        { name: "Resume.docx", type: "file" },
        { name: "Project.pdf", type: "file" },
      ],
    },
    {
      name: "Pictures",
      type: "folder",
      children: [
        { name: "vacation.jpg", type: "file" },
        { name: "trip.png", type: "file" },
      ],
    },
  ]);

  const [selectedFolder, setSelectedFolder] = useState(null);

  const updateData = (items, updateFn) =>
    items.map((item) => {
      if (updateFn(item)) return { ...item };
      if (item.children) {
        return { ...item, children: updateData(item.children, updateFn) };
      }
      return item;
    });

  const createItem = (type) => {
    const newItem = {
      name: type === "folder" ? "New Folder" : "New File.txt",
      type,
      children: type === "folder" ? [] : undefined,
    };
    if (selectedFolder) {
      setData(
        updateData(data, (item) => {
          if (item === selectedFolder) {
            item.children.push(newItem);
            return true;
          }
          return false;
        })
      );
    }
  };

  const renameItem = (itemToRename, newName) => {
    setData(
      updateData(data, (item) => {
        if (item === itemToRename) {
          item.name = newName;
          return true;
        }
        return false;
      })
    );
  };

  const deleteItem = (itemToDelete) => {
    const deleteRecursive = (items) =>
      items.filter((item) => {
        if (item === itemToDelete) return false;
        if (item.children) {
          item.children = deleteRecursive(item.children);
        }
        return true;
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-semibold mb-4">Directories</h2>
        <ul className="space-y-4">
          {data.map((item, index) => (
            <TreeItem
              key={index}
              item={item}
              onFolderClick={setSelectedFolder}
              onRename={renameItem}
              onDelete={deleteItem}
            />
          ))}
        </ul>
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => createItem("folder")}
          >
            + New Folder
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => createItem("file")}
          >
            + New File
          </button>
        </div>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">
          {selectedFolder ? selectedFolder.name : "Select a Folder"}
        </h2>
        {selectedFolder && selectedFolder.children ? (
          <ul className="space-y-4">
            {selectedFolder.children.map((child, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-lg text-gray-700">{child.name}</span>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition duration-300"
                    onClick={() =>
                      renameItem(
                        child,
                        prompt("Enter new name:", child.name) || child.name
                      )
                    }
                  >
                    🖋 Rename
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => deleteItem(child)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No files to display</p>
        )}
      </div>
    </div>
  );
};

function TreeItem({ item, onFolderClick, onRename, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <li className="border-l-4 pl-4">
      {item.type === "folder" ? (
        <>
          <div
            onClick={() => {
              toggleOpen();
              onFolderClick(item);
            }}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="text-lg font-medium text-gray-800">
              {isOpen ? "📁" : "📁"} <span>{item.name}</span>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onRename(
                    item,
                    prompt("Enter new name:", item.name) || item.name
                  );
                }}
              >
                🖋
              </button>
              <button
                className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item);
                }}
              >
                Delete
              </button>
            </div>
          </div>
          {isOpen && item.children && (
            <ul className="ml-4 mt-2">
              {item.children.map((child, index) => (
                <TreeItem
                  key={index}
                  item={child}
                  onFolderClick={onFolderClick}
                  onRename={onRename}
                  onDelete={onDelete}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg text-gray-700">{item.name}</span>
          <div className="flex space-x-2">
            <button
              className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition duration-300"
              onClick={() =>
                onRename(
                  item,
                  prompt("Enter new name:", item.name) || item.name
                )
              }
            >
              🖋
            </button>
            <button
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-300"
              onClick={() => onDelete(item)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default MainContainer;
