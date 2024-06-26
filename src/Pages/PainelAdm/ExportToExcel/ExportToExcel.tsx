import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import xlsxIcon from '../../../assets/icons/xlsx.svg';
import style from './ExportToExcel.module.css';

interface exportExcelType<T> {
  data: T[];
  fileName: string;
  fetchAllData?: () => Promise<T[]>;
}

const ExportToExcel = <T,>({ data, fileName, fetchAllData }: exportExcelType<T>) => {
  const handleExport = async () => {
    let exportData = data;
    if (fetchAllData) {
      exportData = await fetchAllData();
    }

    try {
      if (!exportData || !Array.isArray(exportData) || exportData.length === 0) {
        throw new Error('Dados inválidos. Certifique-se de que os dados são uma array não vazia.');
      }

      // Cria uma nova planilha do Excel
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Gera um arquivo Excel
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      // Salva o arquivo
      saveAs(dataBlob, `${fileName}.xlsx`);
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
      alert('Ocorreu um erro ao exportar para Excel. Verifique os dados e tente novamente.');
    }
  };

  return (
    <button className={style.buttonExport} onClick={handleExport}>
      <img src={xlsxIcon} alt="" />
      Exportar
    </button>
  );
};

export default ExportToExcel;
