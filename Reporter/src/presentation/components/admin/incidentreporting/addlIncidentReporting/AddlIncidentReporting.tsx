import React, { useState, useCallback, useMemo } from 'react';
import { Stack, Switch, Text, Table, Button, Group, Grid, MultiSelect } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import TableRisk from './TableRisk';

// Custom styles with React.CSSProperties typing
const inputStyles: {
  input: React.CSSProperties;
  inputFocus: React.CSSProperties;
  select: React.CSSProperties;
  textarea: React.CSSProperties;
  label: React.CSSProperties;
  required: React.CSSProperties;
  fileButton: React.CSSProperties;
  fileInputWrapper: React.CSSProperties;
} = {
  input: {
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '14px',
    color: '#333',
    width: '100%',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  inputFocus: {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.3)',
    outline: 'none',
  },
  select: {
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '14px',
    color: '#333',
    width: '100%',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27 fill=%27%236c757d%27%3E%3Cpath d=%27M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%27/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    backgroundSize: '12px',
  },
  textarea: {
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    padding: '8px 12px',
    fontSize: '14px',
    color: '#333',
    width: '100%',
    minHeight: '100px',
    resize: 'vertical',
  },
  label: {
    fontSize: '14px',
    color: '#6c757d',
    marginBottom: '6px',
    display: 'block',
  },
  required: {
    color: 'red',
  },
  fileButton: {
    display: 'inline-block',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s ease',
  },
  fileInputWrapper: {
    position: 'relative',
    display: 'inline-block',
  },
};

const AddlIncidentReporting: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [reportClassification, setReportClassification] = useState<string>('');
  const [reportType, setReportType] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [incidentSite, setIncidentSite] = useState<string>('');
  const [siteName, setSiteName] = useState<string>('');
  const [businessDepartment, setBusinessDepartment] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [contractorInvolved, setContractorInvolved] = useState<string>('');
  const [equipmentInvolved, setEquipmentInvolved] = useState<string>('');
  const [reportTitle, setReportTitle] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [likelihood, setLikelihood] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  // Memoized switch change handler
  const handleSwitchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);
    if (!isChecked) setSelectedValues([]);
  }, []);

  // Memoized file change handler
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files;
    if (newFiles && newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...Array.from(newFiles)]);
    }
  }, []);

  // Memoized file removal handler
  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  }, []);

  // Memoized static data
  const multiSelectData = useMemo(() => ['React', 'Angular', 'Vue', 'Svelte'], []);
  const reportClassificationData = useMemo(() => ['Service Quality', 'Safety Incident', 'Environmental Issue'], []);
  const reportTypeData = useMemo(() => ['Hazardous Situation', 'Near Miss', 'Incident'], []);
  const incidentSiteData = useMemo(() => ['Field Location', 'Office', 'Warehouse'], []);
  const businessDepartmentData = useMemo(() => ['Administration', 'Operations', 'Engineering'], []);
  const clientData = useMemo(() => ['Client A', 'Client B', 'Client C'], []);
  const locationData = useMemo(() => ['Location A', 'Location B', 'Location C'], []);
  const contractorData = useMemo(() => ['Contractor A', 'Contractor B', 'Contractor C'], []);
  const equipmentData = useMemo(() => ['Equipment A', 'Equipment B', 'Equipment C'], []);
  const likelihoodSeverityData = useMemo(() => ['Minor (1)', 'Moderate (2)', 'Severe (3)'], []);

  // Memoized table rows
  const tableRows = useMemo(
    () =>
      files.map((file, index) => (
        <Table.Tr key={file.name}>
          <Table.Td>
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
            )}
          </Table.Td>
          <Table.Td fz="13px" c="rgb(34 34 34 / 58%)">
            {file.name}
          </Table.Td>
          <Table.Td fz="13px" c="rgb(34 34 34 / 58%)">
            {(file.size / 1024).toFixed(2)} KB
          </Table.Td>
          <Table.Td>
            <Button variant="subtle" color="red" onClick={() => handleRemoveFile(index)} fz="13px">
              Remove
            </Button>
          </Table.Td>
        </Table.Tr>
      )),
    [files, handleRemoveFile]
  );

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Text
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          ff='"Roboto", sans-serif'
          fw={700}
          c="#6c757d"
          fz="18px"
        >
          Incident Reporting
        </Text>
        <Text fz="sm" c="#6c757d">
          Report Reference: [Reference Number]
        </Text>
      </Group>

      <Stack p="1em" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
        {/* First Row: Report Classification, Report Type, Date and Time */}
        <Grid>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Report Classification
            </label>
            <select
              style={inputStyles.select}
              value={reportClassification}
              onChange={(e) => setReportClassification(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Service Quality</option>
              {reportClassificationData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Report Type
            </label>
            <select
              style={inputStyles.select}
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Hazardous Situation</option>
              {reportTypeData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>Date and Time</label>
            <input
              type="text"
              style={inputStyles.input}
              placeholder="mm/dd/yyyy --:--"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            />
          </Grid.Col>
        </Grid>

        {/* Second Row: Incident Site, Site Name, Business Department */}
        <Grid>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Incident Site
            </label>
            <select
              style={inputStyles.select}
              value={incidentSite}
              onChange={(e) => setIncidentSite(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Field Location</option>
              {incidentSiteData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Site Name
            </label>
            <input
              type="text"
              style={inputStyles.input}
              placeholder="Site Name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Business Department
            </label>
            <select
              style={inputStyles.select}
              value={businessDepartment}
              onChange={(e) => setBusinessDepartment(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Administration</option>
              {businessDepartmentData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
        </Grid>

        {/* Third Row: Client, Project ID */}
        <Grid>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>Client</label>
            <select
              style={inputStyles.select}
              value={client}
              onChange={(e) => setClient(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Select Client</option>
              {clientData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>Project ID</label>
            <input
              type="text"
              style={inputStyles.input}
              placeholder="Enter Project ID"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            />
          </Grid.Col>
        </Grid>

        {/* Fourth Row: Location, Contractor Involved, Equipment Involved */}
        <Grid>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>Location</label>
            <select
              style={inputStyles.select}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Select Location</option>
              {locationData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Contractor Involved
            </label>
            <select
              style={inputStyles.select}
              value={contractorInvolved}
              onChange={(e) => setContractorInvolved(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Contractor</option>
              {contractorData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={4}>
            <label style={inputStyles.label}>Equipment Involved</label>
            <select
              style={inputStyles.select}
              value={equipmentInvolved}
              onChange={(e) => setEquipmentInvolved(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Equipment Name</option>
              {equipmentData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
        </Grid>

        {/* Report Title */}
        <div>
          <label style={inputStyles.label}>
            <span style={inputStyles.required}>*</span> Report Title
          </label>
          <input
            type="text"
            style={inputStyles.input}
            placeholder="Report Title"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
          />
        </div>

        {/* Report Description */}
        <div>
          <label style={inputStyles.label}>
            <span style={inputStyles.required}>*</span> Report Description
          </label>
          <textarea
            style={inputStyles.textarea}
            placeholder="Enter report description"
            value={reportDescription}
            onChange={(e) => setReportDescription(e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
            onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
          />
        </div>

        {/* Visibility Section */}
        <Stack gap="xs">
          <Group align="center">
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              onLabel={<IconCheck size={16} />}
              offLabel={<IconX size={16} />}
            />
            <Text fz="sm" c="#6c757d">
              CUSTOMIZE VISIBILITY
            </Text>
          </Group>
          <div>
            <MultiSelect
              label={<Text fz="sm" c="#6c757d">VISIBLE TO</Text>}
              placeholder="Select users"
              data={multiSelectData}
              value={selectedValues}
              onChange={setSelectedValues} // Directly use setSelectedValues for Mantine MultiSelect
              disabled={!checked}
              styles={{
                input: { backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px' },
                label: { marginBottom: '8px' },
              }}
            />
          </div>
          <Text fz="xs" c="#6c757d">
            When the toggle is OFF, the report is visible to all users.
          </Text>
        </Stack>

        {/* Attach Files Section */}
        <Stack gap="xs">
          <div style={inputStyles.fileInputWrapper}>
            <label style={inputStyles.label}>ATTACH FILES</label>
            <label style={inputStyles.fileButton} htmlFor="file-upload">
              Choose Files
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              style={{ ...inputStyles.input, display: 'none' }}
              onChange={handleFileChange}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            />
            <Text fz="xs" c="#6c757d" style={{ marginTop: '4px' }}>
              {files.length > 0 ? `${files.length} file(s) selected` : 'No files chosen'}
            </Text>
          </div>
          {files.length > 0 && (
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Preview</Table.Th>
                  <Table.Th>File Name</Table.Th>
                  <Table.Th>File Size</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{tableRows}</Table.Tbody>
            </Table>
          )}
        </Stack>

        {/* Likelihood and Severity */}
        <Grid>
          <Grid.Col span={6}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Likelihood of the Event
            </label>
            <select
              style={inputStyles.select}
              value={likelihood}
              onChange={(e) => setLikelihood(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Minor (1)</option>
              {likelihoodSeverityData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
          <Grid.Col span={6}>
            <label style={inputStyles.label}>
              <span style={inputStyles.required}>*</span> Severity of the Event
            </label>
            <select
              style={inputStyles.select}
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
              onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
            >
              <option value="">Minor (1)</option>
              {likelihoodSeverityData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Grid.Col>
        </Grid>

        <TableRisk />
      </Stack>
    </Stack>
  );
};

export default AddlIncidentReporting;