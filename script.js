
var nodes = null;
var edges = null;
var network = null;
// randomly create some nodes and edges
var data = getScaleFreeNetwork(25);
var seed = 2;


function destroy() {
    if (network !== null) {
        network.destroy();
        network = null;
    }
}
function draw() {
    // debugger;
    destroy();
    // nodes = [];
    // edges = [];

    const getColor = (colors) => {
        console.log("cambio de color");
        return colors[Math.floor(Math.random() * colors.length)];
    } 
    const colors = [
        "#EDEAE0",
        "#F2F3F4",
        "#FAEBD7",
        "#FFF8DC",
        "#EFDFBB",
        "#F0EAD6",
        "#FFFAF0",
        "#F8F8FF",
        "#F4F0EC",
        "#FAF0E6",
        "#F8F4FF",
        "#F5FFFA",
        "#E9FFDB",
        "#FDF5E6",
        "#F1E9D2",
        "#EAE0C8",
        "#FFFDD0",
        "#FFE4E1",
        "#D0F0C0",
        "#E0FFFF"
    ]

    var container = document.getElementById("mynetwork");
    
    var options = {
        layout: { randomSeed: seed }, // just to make sure the layout is the same when the locale is changed
        locale: "es",
        width: "100%",
        height: "100%",
        // physics: false,
        nodes:{
            shape: "circle",
            color: {
                border: "#B2BEB5",
                highlight: {
                    border: "#2B7CE9",
                    background: "#D2E5FF",
                },
                hover: {
                    border: "#2B7CE9",
                    background: "#D2E5FF",
                },
            },
            shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.3)",
                size: 10,
                x: 5,
                y: 5,
            },
            font: {
                face: "Outfit",
                size: 14,
                color: "#000000",
                weight: "bold",
            }
        },
        shadow: true,
        manipulation: {
            enabled: true,
            addNode: function (data, callback) {
                color = getColor(colors);
                console.log("data: ", data);
                data.label = "";
                data.color = color;
                // filling in the popup DOM elements
                document.getElementById("node-operation").innerText = "Añade un vértice";
                editNode(data, clearNodePopUp, callback);
            },
            editNode: function (data, callback) {
                // filling in the popup DOM elements
                document.getElementById("node-operation").innerText = "Editar el vértice";
                editNode(data, cancelNodeEdit, callback);
            },
            addEdge: function (data, callback) {
                data.label = "";
                if (data.from == data.to) {
                    var r = confirm("Quiere conectar un nodo a si mismo?");
                    if (r != true) {
                        callback(null);
                        return;
                    }
                }
                document.getElementById("edge-operation").innerText = "Añadir arista";
                editEdgeWithoutDrag(data, callback);
            },
            editEdge: {
                editWithoutDrag: function (data, callback) {
                    document.getElementById("edge-operation").innerText = "Editar arista";
                    editEdgeWithoutDrag(data, callback);
                },
            },
        },
    };
    network = new vis.Network(container, data, options);
}

function editNode(data, cancelAction, callback) {
    console.log(data)
    document.getElementById("node-label").value = data.label;
    document.getElementById("node-saveButton").onclick = saveNodeData.bind(
        this,
        data,
        callback
    );
    document.getElementById("node-cancelButton").onclick = cancelAction.bind(
        this,
        callback
    );
    document.getElementById("node-popUp").style.display = "block";
}

// Callback passed as parameter is ignored
function clearNodePopUp() {
    document.getElementById("node-saveButton").onclick = null;
    document.getElementById("node-cancelButton").onclick = null;
    document.getElementById("node-popUp").style.display = "none";
}

function cancelNodeEdit(callback) {
    clearNodePopUp();
    callback(null);
}

function saveNodeData(data, callback) {
    data.label = document.getElementById("node-label").value;
    clearNodePopUp();
    callback(data);
}

function editEdgeWithoutDrag(data, callback) {
    // filling in the popup DOM elements
    document.getElementById("edge-label").value = data.label;
    document.getElementById("edge-saveButton").onclick = saveEdgeData.bind(
        this,
        data,
        callback
    );
    document.getElementById("edge-cancelButton").onclick = cancelEdgeEdit.bind(
        this,
        callback
    );
    document.getElementById("edge-popUp").style.display = "block";
}

function clearEdgePopUp() {
    document.getElementById("edge-saveButton").onclick = null;
    document.getElementById("edge-cancelButton").onclick = null;
    document.getElementById("edge-popUp").style.display = "none";
}

function cancelEdgeEdit(callback) {
    clearEdgePopUp();
    callback(null);
}

function saveEdgeData(data, callback) {
    if (typeof data.to === "object") data.to = data.to.id;
    if (typeof data.from === "object") data.from = data.from.id;
    data.label = document.getElementById("edge-label").value;
    clearEdgePopUp();
    callback(data);
}

function init() {
    draw();
}
