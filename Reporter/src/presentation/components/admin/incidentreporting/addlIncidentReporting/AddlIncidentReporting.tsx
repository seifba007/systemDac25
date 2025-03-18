import React, { useState, useCallback, useMemo } from 'react';
import { Stack, Switch, Text, Table, Button, Group, Grid, MultiSelect } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import TableRisk from './TableRisk';
import { createIncidentReporting } from '@/core/services/modulesServices/incidentreporting.service';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../../../../../../eMaint/src/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';

// Define styles with proper TypeScript typing
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
  const [visibleTo, setVisibleTo] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [reportClassification, setReportClassification] = useState<string>('');
  const [reportType, setReportType] = useState<string>('');
  const [dateTime, setDateTime] = useState<string>('');
  const [incidentSite, setIncidentSite] = useState<string>('');
  const [siteName, setSiteName] = useState<string>('');
  const [businessDepartment, setBusinessDepartment] = useState<string>('');
  const [client, setClient] = useState<string>('');
  const [projectID, setProjectID] = useState<string>(''); // Changed to projectID
  const [location, setLocation] = useState<string>('');
  const [contractorInvolved, setContractorInvolved] = useState<string>(''); // Yes/No
  const [equipmentInvolved, setEquipmentInvolved] = useState<string>('');
  const [equipmentName, setEquipmentName] = useState<string>(''); // Added equipmentName
  const [reportTitle, setReportTitle] = useState<string>('');
  const [reportDescription, setReportDescription] = useState<string>('');
  const [likelihood, setLikelihood] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  // Memoized switch change handler
  const handleSwitchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);
    if (!isChecked) setVisibleTo([]);
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
  const multiSelectData = useMemo(() => ['React', 'Angular', 'Vue', 'Svelte'], []); // Replace with actual user IDs or names
  const reportClassificationData = useMemo(() => ['HSE', 'Both'], []);
  const reportTypeData = useMemo(() => ['Accident/Non Compliance', 'Environment'], []);
  const incidentSiteData = useMemo(() => ['Field Location', 'Office', 'Warehouse'], []);
  const businessDepartmentData = useMemo(() => ['Operations', 'Development', 'Management'], []);
  const clientData = useMemo(() => ['Client A', 'Client B', 'Client C'], []);
  const locationData = useMemo(() => ['Location A', 'Location B', 'Location C'], []);
  const contractorData = useMemo(() => ['Yes', 'No'], []); // Changed to Yes/No
  const equipmentData = useMemo(() => ['SmartDac', '3rd Party', 'None'], []);
  const equipmentNameData = useMemo(() => ['Equipment A', 'Equipment B', 'None'], []); // Added
  const likelihoodSeverityData = useMemo(() => ['Very Low (1)', 'Low (2)', 'Moderate (3)', 'High (4)', 'Very High (5)'], []);
  const severityOfTheEventData = useMemo(() => ['Minor (1)', 'Moderate (2)', 'Serious (3)', 'Major (4)', 'Catastrophic (5)'], []);

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

  // Form submission handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();


  
      // Prepare data object matching Flask API expectations
      const data = {
        reportClassification,
        reportType,
        dateTime: dateTime || new Date().toISOString(), // Default to current time if empty
        incidentSite,
        siteName,
        businessDepartment,
        client: client || null,
        projectID: projectID || null,
        location: location || null,
        contractorInvolved, // Sends "Yes" or "No"
        equipmentInvolved,
        equipmentName: equipmentName || null,
        reportTitle,
        reportDescription,
        likelihood: likelihood.split(' ')[1]?.replace('(', '').replace(')', '') || '', // Extract number (e.g., "1" from "Very Low (1)")
        severity: severity.split(' ')[1]?.replace('(', '').replace(')', '') || '', // Extract number (e.g., "1" from "Minor (1)")
        visibleTo: checked ? JSON.stringify(visibleTo) : JSON.stringify(['all']), // Backend expects JSON string
        attachedFiles: JSON.stringify(files.map(file => ({ name: file.name, size: file.size }))), // Backend expects JSON string of file metadata
      };

      try {
        await createIncidentReporting(data,user?.organization); // Assume this sends JSON
        // Reset form
        setFiles([]);
        setVisibleTo([]);
        setReportClassification('');
        setReportType('');
        setDateTime('');
        setIncidentSite('');
        setSiteName('');
        setBusinessDepartment('');
        setClient('');
        setProjectID('');
        setLocation('');
        setContractorInvolved('');
        setEquipmentInvolved('');
        setEquipmentName('');
        setReportTitle('');
        setReportDescription('');
        setLikelihood('');
        setSeverity('');
        setChecked(false);
        toast.success('New Incident Report created');
      } catch (error) {
        toast.error('Failed to create Incident Report');
        console.error(error);
      }
    },
    [
      reportClassification,
      reportType,
      dateTime,
      incidentSite,
      siteName,
      businessDepartment,
      client,
      projectID,
      location,
      contractorInvolved,
      equipmentInvolved,
      equipmentName,
      reportTitle,
      reportDescription,
      likelihood,
      severity,
      checked,
      visibleTo,
      files,
    ]
  );

  // Handler for when a cell in TableRisk is clicked
  const handleRiskCellClick = useCallback((selectedLikelihood: string, selectedSeverity: string) => {
    setLikelihood(selectedLikelihood);
    setSeverity(selectedSeverity);
  }, []);
  const user = useAppSelector(selectConnectedUser);

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Text ff='"Roboto", sans-serif' fw={700} c="#6c757d" fz="18px">
          Incident Reporting
        </Text>
        <Text fz="sm" c="#6c757d">
          Report Reference: [Reference Number]
        </Text>
      </Group>

      <Stack p="1em" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
        <form onSubmit={handleSubmit}>
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
                <option value="">Select Classification</option>
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
                <option value="">Select Type</option>
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
                type="datetime-local" // Changed to datetime-local for ISO format
                style={inputStyles.input}
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
                <option value="">Select Site</option>
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
                <option value="">Select Department</option>
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
                value={projectID}
                onChange={(e) => setProjectID(e.target.value)}
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
                <option value="">Select</option>
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
                <option value="">Select Equipment</option>
                {equipmentData.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Grid.Col>
            <Grid.Col span={4}>
              <label style={inputStyles.label}>Equipment Name</label>
              <select
                style={inputStyles.select}
                value={equipmentName}
                onChange={(e) => setEquipmentName(e.target.value)}
                onFocus={(e) => Object.assign(e.target.style, inputStyles.inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })}
              >
                <option value="">Select Equipment Name</option>
                {equipmentNameData.map((option) => (
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
                label={<Text fz="sm" c="#6c757d">Visible To</Text>}
                placeholder="Select users"
                data={multiSelectData} // Replace with actual user data
                value={visibleTo}
                onChange={setVisibleTo}
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
                <option value="">Select Likelihood</option>
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
                <option value="">Select Severity</option>
                {severityOfTheEventData.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Grid.Col>
          </Grid>

          <Button type="submit" mt="md" bg="#007bff" style={{ color: '#fff', borderRadius: '4px' }}>
            Submit
          </Button>
        </form>

        <TableRisk likelihood={likelihood} severity={severity} onCellClick={handleRiskCellClick} />
      </Stack>
    </Stack>
  );
};

export default AddlIncidentReporting;