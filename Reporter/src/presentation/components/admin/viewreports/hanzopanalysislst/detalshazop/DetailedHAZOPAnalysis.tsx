import React, { useState } from "react";
import {
  Accordion,

  Box,
  Button,
  Flex,

  Menu,
  Text,

} from "@mantine/core";
import { Folder2 } from "iconsax-react";
import CreateNode from "./CreateNode";
import RiskAssessmentModal from "./RiskAssessmentModal";

// Define interfaces for HazopItem and Node
interface HazopItem {
  id: number;
  parameter: string;
  deviation: string;
  designIntent: string;
  comments: string;
  cause: string;
  consequence: string;
  initialRisk: string;
  initialLikelihood?: string;
  initialSeverity?: string;
  safeguard: string;
  recommendation: string;
  residualRisk: string;
  residualLikelihood?: string;
  residualSeverity?: string;
  status: string;
}

interface Node {
  name: string;
  type: string;
  description: string;
  parameters: string[];
  attachments: File[];
}

// Define the type for the active risk cell
interface ActiveRiskCell {
  cell: HTMLElement;
  item: HazopItem;
}

// Helper function to map risk levels to styles and labels
const mapRiskLevel = (riskValue: number): { level: string; style: React.CSSProperties } => {
  if (riskValue >= 1 && riskValue <= 4) {
    return { level: "L", style: { backgroundColor: "#4c7c04", color: "white", fontWeight: 550 } };
  } else if (riskValue >= 5 && riskValue <= 9) {
    return { level: "M", style: { backgroundColor: "#FFCA28", color: "white", fontWeight: 550 } };
  } else if (riskValue >= 10 && riskValue <= 15) {
    return { level: "H", style: { backgroundColor: "#f99d09", color: "white", fontWeight: 550 } };
  } else if (riskValue >= 16 && riskValue <= 25) {
    return { level: "VH", style: { backgroundColor: "#F44336", color: "white", fontWeight: 550 } };
  } else {
    return { level: "N/A", style: { backgroundColor: "#757575", color: "white" } };
  }
};

const DetailedHAZOPAnalysis: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      name: "Flowline A",
      type: "Line",
      description: "Flowline connecting wellhead to separator.",
      parameters: ["high pressure", "high temperature"],
      attachments: [],
    },
    {
      name: "Separator",
      type: "Equipment",
      description: "Separates gas and liquid.",
      parameters: ["over"],
      attachments: [],
    },
  ]);
  const [parameters] = useState<string[]>(["Pressure", "Temperature"]);
  const [deviations] = useState<string[]>(["High"]);
  const [hazopItems, setHazopItems] = useState<HazopItem[]>([
    {
      id: 1,
      parameter: "Pressure",
      deviation: "High",
      designIntent: "Maintain flowline pressure below design limits.",
      comments: "Pressure relief valves installed but further study required.",
      cause: "Overpressure due to well surge",
      consequence: "Flowline rupture, release of hydrocarbons",
      initialRisk: "12",
      initialLikelihood: "4",
      initialSeverity: "3",
      safeguard: "Pressure relief valve (PRV), monitoring",
      recommendation: "Install additional PRV and conduct review",
      residualRisk: "4",
      residualLikelihood: "2",
      residualSeverity: "2",
      status: "Completed",
    },
    {
      id: 2,
      parameter: "",
      deviation: "",
      designIntent: "",
      comments: "",
      cause: "",
      consequence: "",
      initialRisk: "2",
      initialLikelihood: "1",
      initialSeverity: "2",
      safeguard: "",
      recommendation: "",
      residualRisk: "9",
      residualLikelihood: "3",
      residualSeverity: "3",
      status: "Pending",
    },
  ]);
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Node | undefined>(nodes[0]);
  const [editNode, setEditNode] = useState<Node | undefined>(undefined);
  const [riskModalOpened, setRiskModalOpened] = useState<boolean>(false);
  const [activeRiskCell, setActiveRiskCell] = useState<ActiveRiskCell | null>(null);
  const [riskType, setRiskType] = useState<"initial" | "residual" | "">("");
  const [selectedLikelihood, setSelectedLikelihood] = useState<string>("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");

  const addHazopItem = () => {
    const newItem: HazopItem = {
      id: Date.now(),
      parameter: "",
      deviation: "",
      designIntent: "",
      comments: "",
      cause: "",
      consequence: "",
      initialRisk: "0",
      safeguard: "",
      recommendation: "",
      residualRisk: "0",
      status: "Not Assigned",
    };
    setHazopItems((prev) => [...prev, newItem]);
  };

  const removeHazopItem = (id: number) => {
    setHazopItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateHazopItem = (id: number, field: keyof HazopItem, value: string) => {
    setHazopItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const openModal = (type: string, node?: Node, item?: HazopItem) => {
    if (type === "createNode") {
      setEditNode(node);
      setModalOpened(true);
    } else if (type === "assign" && item) {
      alert(`Assign action for HAZOP item: ${item.id}`);
    } else {
      alert(`Open ${type} modal`);
    }
  };

  const closeModal = () => {
    setModalOpened(false);
    setEditNode(undefined);
  };

  const saveNode = (updatedNode: Node) => {
    if (editNode) {
      setNodes((prev) =>
        prev.map((node) => (node.name === editNode.name ? updatedNode : node))
      );
      if (selectedNode?.name === editNode.name) {
        setSelectedNode(updatedNode);
      }
    } else {
      setNodes((prev) => [...prev, updatedNode]);
    }
  };

  const selectNode = (node: Node) => {
    setSelectedNode(node);
  };

  const openRiskModal = (
    cell: HTMLElement,
    type: "initial" | "residual",
    item: HazopItem
  ) => {
    setActiveRiskCell({ cell, item });
    setRiskType(type);
    setRiskModalOpened(true);
  };

  const setRiskValue = () => {
    const riskValue = Number(selectedLikelihood) * Number(selectedSeverity);

    if (activeRiskCell) {
      const { item } = activeRiskCell;
      const updatedItem = {
        ...item,
        ...(riskType === "initial"
          ? {
              initialRisk: riskValue.toString(),
              initialLikelihood: selectedLikelihood,
              initialSeverity: selectedSeverity,
            }
          : {
              residualRisk: riskValue.toString(),
              residualLikelihood: selectedLikelihood,
              residualSeverity: selectedSeverity,
            }),
      };
      setHazopItems((prev) =>
        prev.map((i) => (i.id === item.id ? updatedItem : i))
      );
    }

    setRiskModalOpened(false);
    setSelectedLikelihood("");
    setSelectedSeverity("");
    setActiveRiskCell(null);
  };

  return (
    <Box pt={'1em'} pr={'1em'} style={{ backgroundColor: "#f2f2f7" }}>
      <Flex gap={"1em"}>
        {/* Left Sidebar */}
        <div className="col-md-2">
          <div className="card p-3" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
            <Menu>
              <Menu.Target>
                <button
                  className="btn w-100 mb-3"
                  style={{ backgroundColor: "#17a497", color: "#ffffff", fontSize: "13px", padding: "6px" }}
                >
                  Create New
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item style={{ fontSize: "13px" }} onClick={() => openModal("createNode")}>
                  Node
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Accordion defaultValue="flowlineA">
              {nodes.map((node, index) => (
                <Accordion.Item key={index} value={node.name.toLowerCase()}>
                  <Accordion.Control onClick={() => selectNode(node)}>
                  
                      <Text fz="12px" w={'80px'}       onClick={(e) => {
                          e.stopPropagation();
                          openModal("createNode", node);
                        }}>{node.name}</Text>
                    
                
                  </Accordion.Control>
                  <Accordion.Panel>
                    {node.parameters.map((param, idx) => (
                      <Flex key={idx} align="center" gap="0.3em" style={{ padding: "0.2em 0", cursor: "pointer" }}>
                        <Folder2 size="13" color="#222" />
                        <Text fz="10.5px">{param}</Text>
                      </Flex>
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
     
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-md-10">
          <div className="card p-3" style={{ backgroundColor: "#ffffff", borderRadius: "8px" }}>
            {/* Parameter Information */}
            <div className="mb-3">
              <Flex justify="space-between" align="center" mb="md">
                <h6 style={{ fontSize: "15px", fontWeight: 600, color: "#6c757d" }}>
                  Parameter Information
                </h6>
                  <Button
                    size="xs"
                    variant="filled"
                    color="red"
                    style={{ padding: "4px 8px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 6l12 12M6 18L18 6" />
                    </svg>
                  </Button>
              </Flex>
              <Flex wrap={'wrap'}>
                <div className="col-md-3">
                  <label className="form-label" style={{ fontSize: "10px", fontWeight: 600, color: "#6c757d" }}>
                    * Parameter
                  </label>
                  <select
                    className="form-control"
                    value={hazopItems[0]?.parameter || ""}
                    onChange={(e) => updateHazopItem(hazopItems[0]?.id || 0, "parameter", e.target.value)}
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      height: "28px",
                      width: "90%",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                    }}
                  >
                    {parameters.map((param, idx) => (
                      <option key={idx} value={param} style={{ fontSize: "10px", padding: "4px" }}>
                        {param}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label" style={{ fontSize: "10px", fontWeight: 600, color: "#6c757d" }}>
                    * Deviation
                  </label>
                  <select
                    className="form-control"
                    value={hazopItems[0]?.deviation || ""}
                    onChange={(e) => updateHazopItem(hazopItems[0]?.id || 0, "deviation", e.target.value)}
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      height: "28px",
                      width: "90%",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                    }}
                  >
                    {deviations.map((dev, idx) => (
                      <option key={idx} value={dev} style={{ fontSize: "10px", padding: "4px" }}>
                        {dev}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label" style={{ fontSize: "10px", fontWeight: 600, color: "#6c757d" }}>
                    Design Intent
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={hazopItems[0]?.designIntent || ""}
                    onChange={(e) => updateHazopItem(hazopItems[0]?.id || 0, "designIntent", e.target.value)}
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      height: "28px",
                      width: "80%",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                    }}
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label" style={{ fontSize: "10px", fontWeight: 600, color: "#6c757d" }}>
                    Comments
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={hazopItems[0]?.comments || ""}
                    onChange={(e) => updateHazopItem(hazopItems[0]?.id || 0, "comments", e.target.value)}
                    style={{
                      fontSize: "10px",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      height: "28px",
                      width: "100%",
                      backgroundColor: "#fff",
                      border: "1px solid #ced4da",
                    }}
                  />
                </div>
              </Flex>
            </div>

            {/* Updated Hazop Analysis section */}
            <div className="mt-3">
              <h5 style={{ fontSize: "17px", fontWeight: 600, color: "#6c757d", marginBottom: "1em" }}>
                Hazop Analysis
              </h5>
              <div className="table-responsive">
                <table
                  className="table table-centered table-nowrap table-borderless table-hover mb-0"
                  id="hazopTable"
                >
                  <thead className="border-top border-bottom bg-light-subtle border-light">
                    <tr className="grandchild-header">
                      <th className="col-2 text-center" style={{ fontSize: "13px" }}>
                        Cause
                      </th>
                      <th className="col-2 text-center" style={{ fontSize: "13px" }}>
                        Consequence
                      </th>
                      <th style={{ width: "4.16666667%", fontSize: "13px" }} className="text-center">
                        I. Risk
                      </th>
                      <th className="col-2 text-center" style={{ fontSize: "13px" }}>
                        SafeGuard
                      </th>
                      <th className="col-2 text-center" style={{ fontSize: "13px" }}>
                        Recommendation
                      </th>
                      <th style={{ width: "4.16666667%", fontSize: "13px" }} className="text-center">
                        R. Risk
                      </th>
                      <th className="col-1 text-center" style={{ fontSize: "13px" }}>
                        Status
                      </th>
                      <th className="col-1 text-center" style={{ fontSize: "13px" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hazopItems.map((item) => {
                      const initialRiskValue = Number(item.initialRisk.replace(/\D/g, ""));
                      const residualRiskValue = Number(item.residualRisk.replace(/\D/g, ""));
                      const initialRisk = mapRiskLevel(initialRiskValue);
                      const residualRisk = mapRiskLevel(residualRiskValue);
                      const statusClass =
                        item.status === "Pending"
                          ? "bg-warning-subtle text-warning":
                          item.status === "Not Assigned"? 
                          "custom-not-assigned": 
                           "bg-success-subtle text-success";
                      const actionStatus = item.status || "Pending";

                      return (
                        <tr key={item.id}>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.cause}
                              onChange={(e) => updateHazopItem(item.id, "cause", e.target.value)}
                              placeholder="Cause"
                              style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "4px", height: "28px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.consequence}
                              onChange={(e) => updateHazopItem(item.id, "consequence", e.target.value)}
                              placeholder="Consequence"
                              style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "4px", height: "28px" }}
                            />
                          </td>
                          <td className="text-center">
                            <Button
                              size="26px"
                              variant="filled"
                              styles={{ root: { ...initialRisk.style, fontSize: "10px", padding: "2px 6px" } }}
                              onClick={(e) => openRiskModal(e.currentTarget.parentElement as HTMLElement, "initial", item)}
                              title={`Likelihood: ${item.initialLikelihood || "N/A"}, Severity: ${item.initialSeverity || "N/A"}, Risk: ${item.initialRisk}`}
                            >
                              <Text fz={'12px'} c='#fff'>{initialRisk.level} ({item.initialRisk})</Text>
                            </Button>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.safeguard}
                              onChange={(e) => updateHazopItem(item.id, "safeguard", e.target.value)}
                              placeholder="SafeGuard"
                              style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "4px", height: "28px" }}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={item.recommendation}
                              onChange={(e) => updateHazopItem(item.id, "recommendation", e.target.value)}
                              placeholder="Recommendation"
                              style={{ fontSize: "10px", padding: "4px 8px", borderRadius: "4px", height: "28px" }}
                            />
                          </td>
                          <td className="text-center">
                            <Button
                              size="26px"
                              variant="filled"
                              styles={{ root: { ...residualRisk.style, fontSize: "10px", padding: "2px 6px" } }}
                              onClick={(e) => openRiskModal(e.currentTarget.parentElement as HTMLElement, "residual", item)}
                              title={`Likelihood: ${item.residualLikelihood || "N/A"}, Severity: ${item.residualSeverity || "N/A"}, Risk: ${item.residualRisk}`}
                            >
                              <Text fz={'12px'} c={'#fff'}>{residualRisk.level} ({item.residualRisk})</Text>
                              
                            </Button>
                          </td>
                          <td className="text-center">
                            <Box
                              className={statusClass}
                              style={{ fontSize: "9px",fontWeight:'700', padding: "6px 6px", borderRadius: "4px" }}
                            >
                              {actionStatus}
                            </Box>
                          </td>
                          <td className="text-center">
                            <Flex gap={'0.5em'} >
                              <Button
                                size="xs"
                                variant="filled"
                                color="blue"
                                onClick={() => openModal("assign", undefined, item)}
                                style={{ padding: "4px 6px" }}
                              >
                                <i className="fas fa-user-plus" style={{ fontSize: "10px" }} />
                              </Button>
                              <Button
                                size="xs"
                                variant="filled"
                                color="red"
                                onClick={() => removeHazopItem(item.id)}
                                style={{ padding: "4px 6px" }}
                              >
                                <i className="fas fa-trash-alt" style={{ fontSize: "10px" }} />
                              </Button>
                            </Flex>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={addHazopItem}
                style={{ fontSize: "13px", padding: "6px 12px" }}
              >
                <i className="fas fa-plus" style={{ marginRight: "5px" }} />
                Add HAZOP Item
              </button>
            </div>
          </div>
        </div>
      </Flex>

      {/* CreateNode Modal */}
      <CreateNode
        opened={modalOpened}
        onClose={closeModal}
        onSave={saveNode}
     
      />

      {/* Risk Assessment Modal */}
      <RiskAssessmentModal
        opened={riskModalOpened}
        onClose={() => setRiskModalOpened(false)}
        setSelectedLikelihood={setSelectedLikelihood}
        setSelectedSeverity={setSelectedSeverity}
        onSetRisk={setRiskValue}
        selectedLikelihood={selectedLikelihood}
        selectedSeverity={selectedSeverity}
      />
    </Box>
  );
};

export default DetailedHAZOPAnalysis;