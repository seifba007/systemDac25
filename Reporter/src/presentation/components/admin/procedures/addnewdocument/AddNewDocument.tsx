import React, { useState } from 'react';
import { Box, Button, FileInput, Stack, Table, Text, TextInput, Select, Textarea, Flex } from '@mantine/core';
import { Folder2, Add, Trash } from 'iconsax-react';

const AddNewDocument = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [documents, setDocuments] = useState(
    [] as {
      filename: string;
      title: string;
      type: string;
      asset: string;
      description: string;
    }[]
  );

  const handleFileChange = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    const newDocuments = uploadedFiles.map((file) => ({
      filename: file.name,
      title: '',
      type: '',
      asset: '',
      description: '',
    }));
    setDocuments((prevDocuments) => [...prevDocuments, ...newDocuments]);
  };

  const handleInputChange = (
    index: number,
    field: keyof typeof documents[number],
    value: string
  ) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index][field] = value;
    setDocuments(updatedDocuments);
  };

  const handleDelete = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    setDocuments(updatedDocuments);
  };

  return (
    <Stack>
      <Text
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        ff={'"Roboto",sans-serif'}
        fw={'700'}
        c={'#6c757d'}
        fz={'18px'}
      >
        Add New Document
      </Text>

      <Stack className="BoxTableForms" p={'1em'} gap={'2em'}>
        <FileInput
          label=""
          placeholder="No file chosen"
          multiple
          w={'50em'}
          onChange={(uploadedFiles) => handleFileChange(uploadedFiles || [])}
          rightSection={
            <Folder2
              size="25"
              color="#868e96"
              variant="Bold"
            />
          }
        />

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th fz={'h5'} c={'#1d1e2094'} >Filename</Table.Th>
              <Table.Th fz={'h5'} c={'#1d1e2094'} >Document Title</Table.Th>
              <Table.Th fz={'h5'} c={'#1d1e2094'} >Document Type</Table.Th>
              <Table.Th fz={'h5'} c={'#1d1e2094'} >Related Asset</Table.Th>
              <Table.Th fz={'h5'} c={'#1d1e2094'} >Description</Table.Th>
              <Table.Th fz={'h5'} c={'#1d1e2094'} >Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {documents.map((doc, index) => (
              <Table.Tr key={index}>
                <Table.Td>{doc.filename}</Table.Td>
                <Table.Td>
                  <TextInput
                    value={doc.title}
                    placeholder="Enter title"
                    onChange={(e) =>
                      handleInputChange(index, 'title', e.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Select
                    placeholder="Select type"
                    data={[
                      { value: 'PDF', label: 'PDF' },
                      { value: 'Word', label: 'Word' },
                      { value: 'Excel', label: 'Excel' },
                    ]}
                    value={doc.type}
                    onChange={(value) =>
                      handleInputChange(index, 'type', value || '')
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    value={doc.asset}
                    placeholder="Enter related asset"
                    onChange={(e) =>
                      handleInputChange(index, 'asset', e.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    value={doc.description}
                    placeholder="Enter description"
                    onChange={(e) =>
                      handleInputChange(index, 'description', e.currentTarget.value)
                    }
                  />
                </Table.Td>
                <Table.Td>
                  <Button
                    color="red"
                    size="xs"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash size={15} />
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};

export default AddNewDocument;
