import { FormField } from "@/presentation/components/input/DynamicForm";

export const formFieldsAssets: FormField[] = [
    { 
      label: 'Asset Name', 
      value: '', 
      type: 'text', 
      name: 'assetName', 
      required: true 
    },
    { 
      label: 'Asset Code', 
      value: '', 
      type: 'text', 
      name: 'assetCode', 
      required: true 
    },
    { 
      label: 'Serial Number', 
      value: '', 
      type: 'text', 
      name: 'serialNumber', 
      required: true 
    },
    { 
      label: 'Main Asset', 
      value: '', 
      type: 'select', 
      name: 'mainAsset', 
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ], 
      required: true 
    },
    { 
      label: 'Parent Asset', 
      value: '', 
      type: 'select', 
      name: 'parentAsset', 
      options: [
        { label: 'Select Parent Asset', value: '' },
        { label: 'Asset 1', value: 'asset1' },
        { label: 'Asset 2', value: 'asset2' }
      ]
    },
    { 
      label: 'Manufacturing Date', 
      value: '', 
      type: 'date', 
      name: 'manufacturingDate' 
    },
    { 
      label: 'Manufacturer', 
      value: '', 
      type: 'select', 
      name: 'manufacturer', 
      options: [
        { label: 'Select Manufacturer', value: '' },
        { label: 'Manufacturer 1', value: 'manufacturer1' },
        { label: 'Manufacturer 2', value: 'manufacturer2' }
      ]
    },
    { 
      label: 'Description', 
      value: '', 
      type: 'textarea', 
      name: 'description' 
    },
    { 
      label: 'Attached Files', 
      value: '', 
      type: 'file', 
      name: 'attachedFiles',
      multifile:true,
      table: [
        { label: 'File Name', value: 'fileName' },
        { label: 'File Size', value: 'fileSize' },
        { label: 'Preview', value: 'preview' },
        { label: 'Action', value: 'action' },
      ],
    }
  ];
  export const formFieldsSpareParts: FormField[] = [
    {
      label: 'Spare Part Name',
      value: '',
      type: 'text',
      name: 'sparePartName',
      required: true
    },
    {
      label: 'Part Number (PN)',
      value: '',
      type: 'text',
      name: 'partNumber',
      required: true
    },
    {
      label: 'Spare Type',
      value: '',
      type: 'select',
      name: 'spareType',
      options: [
        { label: 'Select Spare Type', value: '' },
        { label: 'Type 1', value: 'type1' },
        { label: 'Type 2', value: 'type2' }
      ],
      required: true
    },
    {
      label: 'Cost',
      value: '',
      type: 'number',
      name: 'cost',
      required: true
    },
    {
      label: 'Minimum Stock',
      value: '',
      type: 'number',
      name: 'minimumStock',
      required: true
    },
    {
      label: 'Where is it used?',
      value: '',
      type: 'select',
      name: 'usedIn',
      options: [
        { label: 'Separator Skid (SEPT - 001)', value: 'SEPT - 001' },
        { label: 'Three Phase Separator (OIL-MM-51 - SEPL-U-66)', value: 'OIL-MM-51 - SEPL-U-66' },
        { label: 'Data acquisition set 002 (5555 - 002)', value: '5555 - 002' },
        { label: 'Child asset testing (PTSH - SEP-001)', value: 'PTSH - SEP-001' },
        { label: 'MANTELA (MNTLA - 72977)', value: 'MNTLA - 72977' },
        { label: 'sdfsdfsdfsdf (PTSH - SEP-002)', value: 'PTSH - SEP-002' }
      ]
    },
    {
      label: 'Description',
      value: '',
      type: 'textarea',
      name: 'description'
    },
    {
      label: 'Attached Files',
      value: '',
      type: 'file',
      name: 'attachedFiles',
      multifile:true,
      table: [
        { label: 'File Name', value: 'fileName' },
        { label: 'File Size', value: 'fileSize' },
        { label: 'Preview', value: 'preview' },
        { label: 'Action', value: 'action' },
      ],
    }
  ];
  export const formFieldsProcedures: FormField[] = [
    {
      label: 'Procedure Name',
      value: '',
      type: 'text',
      name: 'procedureName',
      required: true
    },
    {
      label: 'Description',
      value: '',
      type: 'textarea',
      name: 'description'
    },
    {
      label: 'Revision Number',
      value: '',
      type: 'number',
      name: 'revisionNumber',
      required: true
    },
    {
      label: 'Upload Template',
      value: '',
      type: 'file',
      name: 'uploadTemplate',
      withbutton:true
    },
    {
      label: 'Procedure Template',
      value: '',
      type: 'text',
      name: 'procedureTemplate',
      required: true
    },
    {
      label: 'Required Parts',
      value: '',
      type: 'textarea',
      name: 'requiredParts'
    }
  ];
  export const formFieldsReport: FormField[] = [
    {
      label: 'Report Classification',
      value: '',
      type: 'select',
      name: 'reportClassification',
      options: [
        { label: 'Service Quality', value: 'serviceQuality' },
      ],
      required: true,
    },
    {
      label: 'Report Type',
      value: '',
      type: 'select',
      name: 'reportType',
      options: [
        { label: 'Hazardous Situation', value: 'hazardousSituation' },
      ],
      required: true,
    },
    {
      label: 'Date and Time',
      value: '',
      type: 'date',
      name: 'dateTime',
      required: true,
    },
    {
      label: 'Incident Site',
      value: '',
      type: 'text',
      name: 'incidentSite',
      required: true,
    },
    {
      label: 'Site Name',
      value: '',
      type: 'text',
      name: 'siteName',
      required: true

    },
    {
      label: 'Client',
      value: '',
      type: 'select',
      name: 'client',
      options: [
        { label: 'Hazardous Situation', value: 'hazardousSituation' },
      ],
    },
    {
      label: 'Project ID',
      value: '',
      type: 'text',
      name: 'projectId',
    },
    {
      label: 'Location',
      value: '',
      type: 'select',
      name: 'location',
      options: [
        { label: 'Hazardous Situation', value: 'hazardousSituation' },
      ],
    },
    {
      label: 'Business Department',
      value: '',
      type: 'select',
      name: 'businessDepartment',
      options: [
        { label: 'Administration', value: 'administration' },
      ],
      required: true,
    },
    {
      label: 'Contractor Involved',
      value: '',
      type: 'select',
      name: 'contractorInvolved',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
      required: true,
    },
    {
      label: 'Equipment Involved',
      value: '',
      type: 'select',
      name: 'equipmentInvolved',
      options: [
        { label: 'SmarDac', value: 'smarDac' },
      ],
      required: true,
    },
    {
      label: 'Equipment Name',
      value: '',
      type: 'select',
      name: 'equipmentName',
      options: [
        { label: 'SmarDac', value: 'smarDac' },
      ],
    },
    {
      label: 'Report Title',
      value: '',
      type: 'text',
      name: 'reportTitle',
      required: true,
    },
    {
      label: 'Report Description',
      value: '',
      type: 'textarea',
      name: 'reportDescription',
    },
   
  ];
  
  export const formFieldsLocation: FormField[] = [
    {
      label: 'Location Name',
      value: '',
      type: 'text',
      name: 'locationName',
      required: true,
    },
    {
      label: 'Location Type',
      value: '',
      type: 'select',
      name: 'locationType',
      options: [
        { label: 'Type 1', value: 'type1' },
        { label: 'Type 2', value: 'type2' },
      ], // Add options as needed
      required: true,
    },
    {
      label: 'Address',
      value: '',
      type: 'text',
      name: 'address',
    },
    {
      label: 'Description',
      value: '',
      type: 'textarea',
      name: 'description',
    },
    {
      label: 'Latitude',
      value: '',
      type: 'text',
      name: 'latitude',
    },
    {
      label: 'Longitude',
      value: '',
      type: 'text',
      name: 'longitude',
    },
  ];
  export const formFieldsSupplier: FormField[] = [
    {
      label: 'Supplier Name',
      value: '',
      type: 'text',
      name: 'supplierName',
      required: true,
    },
    {
      label: 'Address',
      value: '',
      type: 'text',
      name: 'address',
      required: true,
    },
    {
      label: 'Phone Number',
      value: '',
      type: 'text',
      name: 'phoneNumber',
      required: true,
    },
    {
      label: 'Country',
      value: '',
      type: 'select',
      name: 'country',
      options: [
        { label: 'USA', value: 'usa' },
        { label: 'Canada', value: 'canada' },
        { label: 'UK', value: 'uk' },
        // Add more countries as needed
      ],
      required: true,
    },
    {
      label: 'Contact Person',
      value: '',
      type: 'text',
      name: 'contactPerson',
      required: true,
    },
    {
      label: 'Supplier Type',
      value: '',
      type: 'select',
      name: 'supplierType',
      options: [
        { label: 'Local', value: 'local' },
        { label: 'International', value: 'international' },
      ],
      required: true,
    },
    {
      label: 'Logo',
      value: '',
      type: 'file',
      name: 'logo',
      multifile:false,
  
    },
    {
      label: 'Notes',
      value: '',
      type: 'textarea',
      name: 'notes',
    },
  ];
  export const formFieldsMeetingReport: FormField[] = [
    {
      label: 'Meeting Type',
      value: '',
      type: 'select',
      name: 'meetingType',
      options: [
        { label: 'Internal', value: 'internal' },
        { label: 'External', value: 'external' },
        // Add more types if needed
      ],
      required: true,
    },
    {
      label: 'Meeting Title',
      value: '',
      type: 'text',
      name: 'meetingTitle',
      required: true,
    },
    {
      label: 'Date and Time',
      value: '',
      type: 'date',
      name: 'meetingDateTime',
      required: true,
    },
    {
      label: 'Business Department',
      value: '',
      type: 'select',
      name: 'businessDepartment',
      options: [
        { label: 'Sales', value: 'sales' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'HR', value: 'hr' },
        { label: 'Finance', value: 'finance' },
        // Add more departments as needed
      ],
      required: true,
    },
    {
      label: 'Business Location',
      value: '',
      type: 'text',
      name: 'businessLocation',
      required: true,
    },
    {
      label: 'Meeting Location',
      value: '',
      type: 'select',
      name: 'meetingLocation',
      options: [
        { label: 'Conference Room', value: 'conferenceRoom' },
        { label: 'Client Office', value: 'clientOffice' },
        { label: 'Online', value: 'online' },
        // Add more locations as needed
      ],
      required: true,
    },
    {
      label: 'Meeting Objective',
      value: '',
      type: 'textarea',
      name: 'meetingObjective',
      required: true,
    },
  ];

  export const formFieldsRisk: FormField[] = [
    {
      label: 'Assessment Title',
      value: '',
      type: 'text',
      name: 'assessmentTitle',
      required: true,
    },
    {
      label: 'Project ID',
      value: '',
      type: 'text',
      name: 'projectId',
    },
    {
      label: 'Client',
      value: '',
      type: 'select',
      name: 'client',
      options: [
        { label: 'No client involved', value: 'noClient' },
      ],
    },
    {
      label: 'Date',
      value: '',
      type: 'date',
      name: 'date',
      required: true,
    },
    {
      label: 'Location',
      value: '',
      type: 'text',
      name: 'location',
      required: true,
    },
    {
      label: 'Business Department',
      value: '',
      type: 'select',
      name: 'businessDepartment',
      options: [
        { label: 'Administration', value: 'administration' },
      ],
      required: true,
    },
    {
      label: 'Assessment Overview',
      value: '',
      type: 'textarea',
      name: 'assessmentOverview',
    },
  ];
  export const formFieldsHAZOP: FormField[] = [
    {
      label: 'System/Process Name',
      value: '',
      type: 'text',
      name: 'systemProcessName',
      required: true,
    },
    {
      label: 'Objectives',
      value: '',
      type: 'textarea',
      name: 'objectives',
      required: true,
    },
    {
      label: 'Boundaries',
      value: '',
      type: 'textarea',
      name: 'boundaries',
      required: true,
    },
    {
      label: 'Start Date',
      value: '',
      type: 'date',
      name: 'startDate',
      required: true,
    },
    {
      label: 'End Date',
      value: '',
      type: 'date',
      name: 'endDate',
      required: true,
    },
    {
      label: 'Review Frequency',
      value: '',
      type: 'select',
      name: 'reviewFrequency',
      options: [
        { label: 'Monthly', value: 'monthly' },
        { label: 'Quarterly', value: 'quarterly' },
        { label: 'Annually', value: 'annually' },
      ],
      required: true,
    },
    {
      label: 'Client',
      value: '',
      type: 'text',
      name: 'client',
    },
    {
      label: 'Project ID',
      value: '',
      type: 'text',
      name: 'projectId',
    },
    {
      label: 'Location',
      value: '',
      type: 'text',
      name: 'location',
    },
    {
      label: 'Team Members',
      value: '',
      type: 'textarea',
      name: 'teamMembers',
    },
  
  ];
  