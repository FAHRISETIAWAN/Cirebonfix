import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography,Table, TableBody, TableCell, TableContainer, TableRow, TableHead,Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Lapri = () => {
    const [cardData, setCardData] = useState([]);

   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NjQ4Yzg5Zi1lODk0LTQyYmItOTRmMC04ZmQxMDU5Yzg2YjQiLCJlbWFpbCI6InVzZXJAYXRyYnBuLmNvbSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjc1NDA0MTAwLCJleHAiOjE5OTEwMjMzMDAsImlhdCI6MTY3NTQwNDEwMCwiaXNzIjoieW91cmlzc3VlcjEyMyIsImF1ZCI6InlvdXJhdWRpZW5jZTEyMyJ9.qNykPumhpSR2CDlzFE5LPtFR5482cp7XdinHybNQ_v0'; // Ganti dengan token Anda

    useEffect(() => {
        axios
          .get('https://api-interop.atrbpn.go.id/api/internal/internal-pusdatin/website/databtelprasuel?kantorid=61EE5CB253CB9728E040A8C0100105BF&awal=0&akhir=7', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            // Mengurutkan data dari terkecil ke terbesar berdasarkan tanggal
            const sortedData = response.data.data.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
            setCardData(sortedData);
          })
          .catch((error) => {
            console.error('Error fetching Kanwil list:', error);
          });
      }, []);
    


    return (
    <Grid container spacing={2} style={{padding:'40px'}}>
 
        <Grid item md={8} xs={12}>
        <Card sx={{  color: 'white',borderRadius:'15px',overflowX: 'auto', maxWidth: '100%'  }}>
                <CardContent>
                <ResponsiveContainer width="100%" height={600} > 
                <LineChart data={cardData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tanggal" />
                <YAxis />
                <Tooltip 
                        contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
                        padding: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}/>
                <Legend />
                <Line type="monotone" dataKey="praelektronik" name="Pra BTEL" stroke="#040296" />
                <Line type="monotone" dataKey="prasuel" name="Pra SUEL" stroke="#e66407" />
                <Line type="monotone" dataKey="prasertel" name="Pra Sertel" stroke="#960602" />
                 </LineChart>
                    </ResponsiveContainer>  
                </CardContent>
            </Card>
        </Grid>

    <Grid item md={4} xs={12}>
        <Card sx={{ borderRadius:'15px', height:'640px' }}>
            <CardContent>
                <div>
                <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                        History Berkas Pra Elektronik
                    </Typography>
                </div>
                <TableContainer component={Paper} style={{ marginTop: '50px'  }}>
              <Table>
                <TableHead>
                    <TableRow>
                 
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Tanggal</TableCell>
                    <TableCell  align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Pra BTEL</TableCell>
                    <TableCell  align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Pra SUEL</TableCell>
                    <TableCell align='center' style={{ backgroundColor: '#427ff2', color: 'white' }}>Pra Sertel</TableCell>                              
                      {/* Tambahkan lebih banyak TableCell sesuai kebutuhan */}
                    </TableRow>
                </TableHead>
                  <TableBody>
                  {cardData.map((item, index) => (
                      <TableRow key={item.ID}>
                      <TableCell  align="left" style={{width: '400px' }}>{item.tanggal}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.praelektronik).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.prasuel).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>  
                      <TableCell align="center"  style={{ width: '400px' }}>{Math.round(item.prasertel).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>                        
                      </TableRow>
                  ))}
                </TableBody>
                </Table>
            </TableContainer>             
            </CardContent>
        </Card>
    </Grid>       
</Grid>
    );
}

export default Lapri;
