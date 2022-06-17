import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';

import FileInput from '../file-input/FileInput'
import MyButton from '../button/Button';

const FileRead = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [labelSpan, setLabelSpan] = useState(0);

  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        if (Object.values(obj).filter(x => x).length > 0) {
          list.push(obj);
        }
      }
    }
    const columns = headers.map(c =>
    ({
      name: c,
      selector: c,
      sortable: true,
    }));

    if (list.length > 0) {
      setData(list);
      setColumns(columns);
    }
  }

  const handleFileUpload = e => {
    const file = e.target.files;
    setLabelSpan(file);
    for (let index = 0; index < file.length; index++) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file[index]);
    }
  }

  const useThemeDetector = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
    const mqListener = (e => {
      setIsDarkTheme(e.matches);
    });

    useEffect(() => {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
      darkThemeMq.addListener(mqListener);
      return () => darkThemeMq.removeListener(mqListener);
    }, []);
    return isDarkTheme;
  }
  const isDarkTheme = useThemeDetector();
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
  const paginationComponentOptions = {
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All',
  };

  return (
    <div className='box'>
      <h1>Read CSV, XLS, XLSX file</h1>
      <FileInput type="file" id="file-input" class="button inputfile" multiple d="M 10 0 l -5.2 4.9 h 3.3 v 5.1 h 3.8 v -5.1 h 3.3 z m 9.3 11.5 l -3.2 -2.1 h -2 l 3.4 2.6 h -3.5 c -0.1 0 -0.2 0.1 -0.2 0.1 l -0.8 2.3 h -6 l -0.8 -2.2 c -0.1 -0.1 -0.1 -0.2 -0.2 -0.2 h -3.6 l 3.4 -2.6 h -2 l -3.2 2.1 c -0.4 0.3 -0.7 1 -0.6 1.5 l 0.6 3.1 c 0.1 0.5 0.7 0.9 1.2 0.9 h 16.3 c 0.6 0 1.1 -0.4 1.3 -0.9 l 0.6 -3.1 c 0.1 -0.5 -0.2 -1.2 -0.7 -1.5 z" onChange={handleFileUpload} value={labelSpan}></FileInput>
      <DataTable
        pagination
        paginationComponentOptions={paginationComponentOptions}
        highlightOnHover
        columns={columns}
        data={data}
        defaultSortFieldId={1}
        expandableRows
        responsive
        expandableRowsComponent={ExpandedComponent}
        theme={isDarkTheme ? "dark" : "light"}
      />
    </div>
  );
};

export default FileRead;