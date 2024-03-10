import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography,Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined';
import { BarChart, Bar, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import axios from 'axios';


const Lapri = () => {
    const [cardData, setCardData] = useState([]);

   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiI2NjQ4Yzg5Zi1lODk0LTQyYmItOTRmMC04ZmQxMDU5Yzg2YjQiLCJlbWFpbCI6InVzZXJAYXRyYnBuLmNvbSIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjc1NDA0MTAwLCJleHAiOjE5OTEwMjMzMDAsImlhdCI6MTY3NTQwNDEwMCwiaXNzIjoieW91cmlzc3VlcjEyMyIsImF1ZCI6InlvdXJhdWRpZW5jZTEyMyJ9.qNykPumhpSR2CDlzFE5LPtFR5482cp7XdinHybNQ_v0'; // Ganti dengan token Anda

    useEffect(() => {
        fetchCardData(); // Panggil fungsi untuk mengambil card
    }, []);
    
    const fetchCardData = async () => {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            
            const cardResponse = await axios.get(
                `https://api-interop.atrbpn.go.id/api/internal/internal-pusdatin/rapim/laprikantah?tahun=${year}&bulan=${month}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Filter data where kantah is 'Kab. Gresik'
            const filteredData = cardResponse.data.data.filter(item => item.kantahid === '61EE5CB253CB9728E040A8C0100105BF');
    

            setCardData(filteredData); 
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };
    


    return (
    <Grid container spacing={2} style={{padding:'40px'}}>
    <Grid item md={4} xs={12} >
        <Card sx={{ background: '#304ffe', color: 'white', borderRadius:'15px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)' }}>
                    <ContentCopyOutlinedIcon style={{ fontSize: '40px', color: '#008efa' }} />
                </div>
                <div style={{marginLeft:'20px'}}>
                    <Typography variant="h5" component="h2">
                        Total Berkas
                    </Typography>
                    <Typography variant="h5" component="p">
                    {cardData.length > 0 ? cardData[0].totalberkas : ''}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    </Grid>
    <Grid item md={4} xs={12}>
        <Card sx={{ background: '#304ffe', color: 'white',borderRadius:'15px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)' }}>
                    <BarChartOutlinedIcon style={{ fontSize: '40px', color: '#008efa' }} />
                </div>
                <div style={{marginLeft:'20px'}}>
                    <Typography variant="h5" component="h2">
                        Kinerja
                    </Typography>
                    <Typography variant="h5" component="p">
                    {cardData.length > 0 ? cardData[0].reratakinerja : ''}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    </Grid>
    <Grid item md={4} xs={12}>
        <Card sx={{ background: '#304ffe', color: 'white',borderRadius:'15px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'white', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)' }}>
                    <TroubleshootOutlinedIcon style={{ fontSize: '40px', color: '#008efa' }} />
                </div>
                <div style={{marginLeft:'20px'}}> 
                    <Typography variant="h5" component="h2">
                        Akselerasi
                    </Typography>
                    <Typography variant="h5" component="p">
                    {cardData.length > 0 ? cardData[0].akselerasi : ''}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    </Grid>
    <Grid item md={8} xs={12}>
        <Card sx={{  color: 'white',borderRadius:'15px' }}>
                <CardContent>
                <ResponsiveContainer width="100%" height={600} > 
                    <BarChart
                    width={1200} 
                    height={300}
                    data={cardData}
                    style={{ marginTop: '20px'}}
                    barGap={10} // Atur jarak antara dua batang berturut-turut di sini
                    barCategoryGap={20} // Atur jarak antara grup batang di sini
                    >
                        
                    <CartesianGrid strokeDasharray="2 2" />
                    
                    <YAxis />
                    <Tooltip 
                        contentStyle={{
                        borderRadius: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
                        padding: '8px', 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    }}/>
                    <Legend
                            verticalAlign="bottom" 
                            wrapperStyle={{ paddingBottom: "20px", paddingTop: "50px" }}
                        />
                    <Bar dataKey="kinerjask" name="Pendaftaran SK" fill="#02023d"  layout="vertical"   />
                    <Bar dataKey="kinerjaperalihan" name="Peralihan" fill="#061993"  layout="vertical"  />
                    <Bar dataKey="kinerjaperubahan" name="Perubahan Hak" fill="#0080bf" layout="vertical"  />
                    <Bar dataKey="kinerjaroya" name="Roya" fill="#00acdf"  layout="vertical"  />
                    <Bar dataKey="kinerjaskpt" name="SKPT" fill="#55d0ff"  layout="vertical"  />
                    <Bar dataKey="kinerjapengecekan" name="Pengecekan" fill="#7ce8ff"  layout="vertical" />
                    <Bar dataKey="kinerjaht" name="Hak Tanggungan" fill="#ccf9ff" layout="vertical"  />
                    </BarChart>
                    </ResponsiveContainer>  
                </CardContent>
            </Card>
        </Grid>

    <Grid item md={4} xs={12}>
        <Card sx={{ borderRadius:'15px', height:'660px' }}>
            <CardContent>
                <div>
                <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                        Kinerja 7 Layanan Prioritas
                    </Typography>
                </div>
            <TableContainer style={{ paddingTop:'40px' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Nama Layanan</TableCell>                        
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Kinerja Layanan</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Pendaftaran SK :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}>{item.kinerjask}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Peraliahan :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}>{item.kinerjaperalihan}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold', fontSize:'18px' }}>Perubahan Hak :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}> {item.kinerjaperubahan}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Roya :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}> {item.kinerjaroya}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>SKPT :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}>{item.kinerjaskpt}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Pengecekan :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}>{item.kinerjapengecekan}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold',fontSize:'18px' }}>Hak Tanggungan :</TableCell>
                        {cardData.map((item, index) => (
                          <TableCell style={{ fontWeight: 'bold',fontSize:'18px',}}>{item.kinerjaht}</TableCell>
                        ))}
                      </TableRow>
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
