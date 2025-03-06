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
  