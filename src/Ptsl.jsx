import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography,Table, TableBody, TableCell, TableContainer, TableRow, TableHead,Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const Lapri = () => {
    const [tableData, setTableData] = useState([]); 
    const [grafik, setGrafik] = useState([]); 
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NjQ4Yzg5Zi1lODk0LTQyYmItOTRmMC04ZmQxMDU5Yzg2YjQiLCJlbWFpbCI6InVzZXJAYXRyYnBuLmNvbSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjc1NDA0MTAwLCJleHAiOjE5OTEwMjMzMDAsImlhdCI6MTY3NTQwNDEwMCwiaXNzIjoieW91cmlzc3VlcjEyMyIsImF1ZCI6InlvdXJhdWRpZW5jZTEyMyJ9.qNykPumhpSR2CDlzFE5LPtFR5482cp7XdinHybNQ_v0'; // Ganti dengan token Anda

    useEffect(() => {
        fetchTableData(); // Panggil fungsi untuk mengambil card
    }, []);
    
    const fetchTableData = async () => {
        try {        
            const cardResponse = await axios.get(
                `https://api-interop.atrbpn.go.id/api/internal/internal-pusdatin/rapim/shatkantah`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Filter data where kantah is 'Kab. Gresik'
            const filteredData = cardResponse.data.data.filter(item => item.ID === '61EE5CB253CB9728E040A8C0100105BF');
    

            setTableData(filteredData); 
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };


    useEffect(() => {
        fetchGrafikData(); // Panggil fungsi untuk mengambil card
    }, []);
    
    const fetchGrafikData = async () => {
        try {        
            const grafikResponse = await axios.get(
                `https://api-interop.atrbpn.go.id/api/internal/internal-pusdatin/rapim/pbtkantah`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Filter data where kantah is 'Kab. Gresik'
            const filteredData = grafikResponse.data.data.filter(item => item.ID === '61EE5CB253CB9728E040A8C0100105BF');
    

            setGrafik(filteredData); 
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

   
    



    return (
        <Grid container spacing={2} style={{padding:'20px'}}>

    <Grid item md={8} xs={12}>
        <Card sx={{ borderRadius:'15px' }}>
            <CardContent>
                <div>
                <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                    Pendaftaran Tanah Sistematis Lengkap (PTSL)
                    </Typography>
                </div>
            <TableContainer component={Paper} style={{ marginTop: '20px'  }}>
              <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align='left' style={{ backgroundColor: '#427ff2', color: 'white' }}>No</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Nama Kantah</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Target SHAT</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>K1</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Realisasi SHAT</TableCell>
                     
                      {/* Tambahkan lebih banyak TableCell sesuai kebutuhan */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {tableData.map((item, index) => (
                      <TableRow key={item.ID}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell  style={{ paddingLeft: '60px',width: '200px' }}>{item.NAMA}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.TARGETYURIDIS).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{item.K1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{item.REALISASISHAT !== 0 ? `${item.REALISASISHAT.toString().replace('.', ',')} %` : '0'}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
                </Table>
            </TableContainer>
            <div style={{paddingTop:'15px'}}>
                <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                    PBT
                    </Typography>
                </div>
            <TableContainer component={Paper} style={{ marginTop: '15px'  }}>
              <Table>
                <TableHead>
                    <TableRow>
                    <TableCell align='left' style={{ backgroundColor: '#427ff2', color: 'white' }}>No</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Nama Kantah</TableCell>
                    <TableCell  align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Target Bidang</TableCell>
                    <TableCell  align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Target Luas</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Total Bidang</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Total Luas (Ha)</TableCell>                    
                      {/* Tambahkan lebih banyak TableCell sesuai kebutuhan */}
                    </TableRow>
                </TableHead>
                  <TableBody>
                  {grafik.map((item, index) => (
                      <TableRow key={item.ID}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell  style={{ paddingLeft: '60px',width: '200px' }}>{item.NAMA}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.TARGETPENGUKURAN).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.TARGETLUASPENGUKURAN).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>  
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.TOTALBIDANG).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>   
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.TOTALLUAS).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                      
                      </TableRow>
                  ))}
                </TableBody>
                </Table>
            </TableContainer>                   
            </CardContent>
        </Card>
    </Grid> 
    <Grid item md={4} xs={12}>
         
        <Card sx={{ borderRadius:'15px' }}>
            <CardContent>
            <div>
            <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                Perbandingan PBT Bidang dan Luas
                </Typography>
            </div>
            <PieChart width={450} height={300}>
            <Pie
              data={grafik}
              dataKey="PERSENTASEBIDANG"
              name="Persentase Bidang"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#fcba03"
              label
            />
            <Pie
              data={grafik}
              dataKey="PERSENTASELUAS"
              name="Persentase Luas"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={110}
              fill="#fc4e03"
              label
            />
             <Tooltip 
                        contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
                        padding: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}/>
            <Legend />
          </PieChart>
            </CardContent>
        </Card>
    </Grid>             
</Grid>
    );
}

export default Lapri;
