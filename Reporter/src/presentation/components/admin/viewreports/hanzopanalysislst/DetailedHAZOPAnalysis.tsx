import React, { useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Flex,
  Group,
  Menu,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconPlus, IconTrash, IconUserPlus } from "@tabler/icons-react";
import { Folder2 } from "iconsax-react";

interface HazopItem {
  id: number;
  cause: string;
  consequence: string;
  safeguard: string;
  recommendation: string;
  status: string;
}

const DetailedHAZOPAnalysis = () => {
  const [parameters] = useState<string[]>(["Parameter 1", "Parameter 2", "Parameter 3"]); // Replace with real data
  const [deviations] = useState<string[]>(["Deviation 1", "Deviation 2", "Deviation 3"]); // Replace with real data
  const [hazopItems, setHazopItems] = useState<HazopItem[]>([]); // HAZOP table rows

  // Add a new HAZOP item
  const addHazopItem = () => {
    const newItem: HazopItem = {
      id: Date.now(),
      cause: "",
      consequence: "",
      safeguard: "",
      recommendation: "",
      status: "",
    };
    setHazopItems((prevItems) => [...prevItems, newItem]);
  };

  // Remove a HAZOP item by index
  const removeHazopItem = (index: number) => {
    setHazopItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  // Dummy function for modal actions
  const openRiskModal = (type: "initial" | "residual") => {
    alert(`Open ${type} risk modal`);
  };

  const openAssignActionModal = (status: string) => {
    alert(`Open assign action modal with status: ${status}`);
  };

  return (
    <Flex gap={"1em"}>
      {/* Left Panel */}
      <Paper shadow="xs" p="xl" w={"12em"}>
        <Stack>
          <div className="mb-2">
            <Menu>
              <Menu.Target>
                <Button
                  className="w-100"
                  leftSection={<i className="ri-file-add-line"></i>}
                  variant="filled"
                  color="#17a497"
                >
                  Create New
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item leftSection={<i className="ri-folder-5-line"></i>} disabled={false}>
                  Node
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <Accordion transitionDuration={0}>
            <Accordion.Item value="photos">
              <Accordion.Control>
                <Text fz={"13px"}>Flowline A</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex align={"center"} gap={"0.3em"} style={{ cursor: "pointer" }} pt={"0.2em"}>
                  <Folder2 size="20" color="#222" />
                  <Text fz={"13px"}>high pressure</Text>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="photos2">
              <Accordion.Control>
                <Text fz={"13px"}>Flowline A</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex align={"center"} gap={"0.3em"} style={{ cursor: "pointer" }} pt={"0.2em"}>
                  <Folder2 size="20" color="#222" />
                  <Text fz={"13px"}>high pressure</Text>
                </Flex>
                <Flex align={"center"} gap={"0.3em"} style={{ cursor: "pointer" }} pt={"0.2em"}>
                  <Folder2 size="20" color="#222" />
                  <Text fz={"13px"}>high pressure</Text>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Paper>

      {/* Right Panel */}
      <Paper shadow="xs" p="xl" w={"100%"}>
        <Group mb="md">
        <Text fw={600} size="17px" mb="sm" c={'rgb(108, 117, 125)'}>
            Parameter Information
          </Text>
        </Group>

        {/* Parameter Info Fields */}
        <div className="row" style={{ gap: "0em" }}>
          <div className="col-md-2">
            <Select
              label={<span>* Parameter</span>}
              placeholder="Select Parameter"
              data={parameters.map((param) => ({ value: param.toLowerCase(), label: param }))}
              required
            />
          </div>
          <div className="col-md-2">
            <Select
              label={<span>* Deviation</span>}
              placeholder="Select Deviation"
              data={deviations.map((dev) => ({ value: dev.toLowerCase(), label: dev }))}
              required
            />
          </div>
          <div className="col-md-4">
            <TextInput label="Design Intent" placeholder="Enter Design Intent" required />
          </div>
          <div className="col-md-4">
            <TextInput label="Comments" placeholder="Enter comments" required />
          </div>
        </div>

        {/* HAZOP Analysis */}
        <div className="mt-3">
          <Text fw={600} size="17px" mb="sm" c={'rgb(108, 117, 125)'} pt={'2em'} pb={'1em'}>
            Hazop Analysis
          </Text>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="text-center">Cause</Table.Th>
                <Table.Th className="text-center">Consequence</Table.Th>
                <Table.Th className="text-center">I. Risk</Table.Th>
                <Table.Th className="text-center">SafeGuard</Table.Th>
                <Table.Th className="text-center">Recommendation</Table.Th>
                <Table.Th className="text-center">R. Risk</Table.Th>
                <Table.Th className="text-center">Status</Table.Th>
                <Table.Th className="text-center">Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {hazopItems.map((item, index) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    <TextInput
                    w={'100px'}
                      value={item.cause}
                      placeholder="Cause"
                      onChange={(e) =>
                        setHazopItems((prevItems) =>
                          prevItems.map((it, idx) =>
                            idx === index ? { ...it, cause: e.target.value } : it
                          )
                        )
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput  w={'100px'}
                      value={item.consequence}
                      placeholder="Consequence"
                      onChange={(e) =>
                        setHazopItems((prevItems) =>
                          prevItems.map((it, idx) =>
                            idx === index ? { ...it, consequence: e.target.value } : it
                          )
                        )
                      }
                    />
                  </Table.Td>
                  <Table.Td className="text-center">
                    <Badge style={{height:'35px'}} radius={'4px'} color={item.status === "Pending" ? "yellow" : "green"}>
                    <Text fz={'15px'}>L4</Text>
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <TextInput 
                      value={item.safeguard}
                      placeholder="SafeGuard"
                      onChange={(e) =>
                        setHazopItems((prevItems) =>
                          prevItems.map((it, idx) =>
                            idx === index ? { ...it, safeguard: e.target.value } : it
                          )
                        )
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      value={item.recommendation}
                      placeholder="Recommendation"
                      onChange={(e) =>
                        setHazopItems((prevItems) =>
                          prevItems.map((it, idx) =>
                            idx === index ? { ...it, recommendation: e.target.value } : it
                          )
                        )
                      }
                    />
                  </Table.Td>
                  <Table.Td className="text-center">
                    <Badge style={{height:'35px'}} radius={'4px'} color={item.status === "Pending" ? "yellow" : "green"}>
                    <Text fz={'15px'}>L4</Text>
                    </Badge>
                  </Table.Td>
                  <Table.Td className="text-center">
                    <Badge color={item.status === "Pending" ? "yellow" : "green"}>
                    <Text fz={'10px'}>Completed</Text>
                    </Badge>
                  </Table.Td>
                  <Table.Td className="text-center">
                    <Group >
                      <Button
                        size="xs"
                        variant="outline"
                        color="blue"
                        onClick={() => openAssignActionModal(item.status)}
                      >
                        <IconUserPlus size={14} />
                      </Button>
                      <Button
                        size="xs"
                        variant="outline"
                        color="red"
                        onClick={() => removeHazopItem(index)}
                      >
                        <IconTrash size={14} />
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Button
            size="xs"
            variant="outline"
            color="blue"
            mt="sm"
            onClick={addHazopItem}
            leftSection={<IconPlus size={16} />}
          >
            Add HAZOP Item
          </Button>
        </div>
      </Paper>
    </Flex>
  );
};

export default DetailedHAZOPAnalysis;
