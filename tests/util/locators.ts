import type { Page } from "@playwright/test";

type Role = Parameters<Page["getByRole"]>[0];

export const locators = {
    //Viewport
    viewport: { role: "img", name: "Viewport" },

    // Radio Buttons
    topView: { role: "radio", name: "Top" },
    frontView: { role: "radio", name: "Front" },
    rightView: { role: "radio", name: "Right" },
    perspectiveView: { role: "radio", name: "Perspective" },
    shadedView: { role: "radio", name: "Shaded" },
    wireframeView: { role: "radio", name: "Wireframe" },
    
    // Buttons
    boxButton: { role: "button", name: "Box"},
    rectangleButton: { role: "button", name: "Rectangle"},
    zoomExtentsButton: { role: "button", name: "Zoom Extents" },
    newLayerButton: { role: "button", name: "New layer" },
    lockLayerButton: (layerName: string) => ({ role: "button", name: `Lock ${layerName}` }),
    unlockLayerButton: (layerName: string) => ({ role: "button", name: `Unlock ${layerName}` }),
    extrudeButton: { role: "button", name: "Extrude" },
    planarSurfaceButton: { role: "button", name: "Planar Surface"},
    polylineObjectButton: { role: "button", name: "Select Polyline obj-" },
    
    // Inputs

    // Box and Rectangle inputs
    firstCornerOfBaseTextbox: { role: "textbox", name: "First corner of base:" },
    otherCornerOfBaseTextbox: { role: "textbox", name: "Other corner of base:" },
    heightTextbox: { role: "textbox", name: "Height (type a number or pick a point):" },

    firstCornerOfRectangleTextbox: { role: "textbox", name: "First corner of rectangle:" },
    otherCornerOfRectangleTextbox: { role: "textbox", name: "Other corner of rectangle:" },

    objectsToExtrudeTextbox: { role: "textbox", name: "Select objects to extrude," },
    extrusionDistanceTextbox: { role: "textbox", name: "Extrusion distance (type a" },
    // Layer Inputs
    layerNameTextbox: { role: "textbox", name: "Layer name" },
    layerDefaultColor: { role: "button", name: "Default color" },

    // Text
    lintelHeading: { role: "heading", name: "Lintel" },
    toolsToolbar: { role: "toolbar", name: "Tools" },
    commandPromptRegion: { role: "region", name: "Command prompt" },
    commandTextbox: { role: "textbox", name: "Command" },

    // Properties Panel
    propertiesPanel: { role: "region", name: "Properties" },


} as const;
