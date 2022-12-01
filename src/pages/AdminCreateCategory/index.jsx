import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import { createNewCategory } from '../../features/category/categorySlice';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import swal from "sweetalert";

const Container = styled.div`
    display: flex;
    flex: 4;
    flex-direction: column;
    padding: 20px;
    border: 1px solid rgba(0,0,0,.125);
    margin: 0 10px 10px 10px;
    border-radius: 5px;
`;

const Wrapper = styled.div`
    display: flex;
    width: 30%;
    padding: 20px;
`;

const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const AlertContainer = styled.div`
    margin-top: 20px
`;

const InputContainer = styled.div`
    margin: 10px;
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
    }
`;

const ImageRow = styled.div`
    display: flex;
    margin: 10px;
`;

const Image = styled.img`
    width: 150px;
    height: 150px;
`;

const InputFile = styled.input`
`;
 
const AdminCreateCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState();
    const dataCategory = useSelector(state => state.category); 
    const [errorInput, setErrorInput] = useState(false);
    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }
    const handleSubmit = () => {
        if(name && image){
            setErrorInput(false);
            const data = new FormData();
            data.append('name', name.toLowerCase());
            data.append('image', image)
            setLoading(true);
            dispatch(createNewCategory(data));
        }
        else {
            setErrorInput(true);
        }
    }
    useEffect(() => {
        if(dataCategory.dataResponse){
            swal("Success!", "Kategori baru berhasil ditambahkan!", "success");
            setLoading(false);
            navigate('/admin/kategori');
        }
    }, [dataCategory.isSuccess])
  return (
    <Container>
        <Typography variant="h5">TAMBAH DATA KATEGORI</Typography>
        {errorInput &&
        <AlertContainer>
            <Alert severity="error">Semua field harus diisi!</Alert>
        </AlertContainer>        
        }
        <Wrapper>
            <Column> 
            <InputContainer>
                <TextField
                    label="Kategori"
                    variant="filled"
                    fullWidth
                    size='normal'
                    type='text'
                    autoComplete="off"
                    inputProps={{style: {fontSize: 13,}}}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </InputContainer>
            <ImageRow>
                {imagePreview && <Image src={imagePreview} alt="images"/>}
                <InputContainer>
                    <InputFile type='file' onChange={handleImage} />
                </InputContainer>
            </ImageRow>
            </Column>
        </Wrapper>
        {loading ? 
        <Button variant="contained" disabled color="success" sx={{ width: '25%', marginLeft: '30px', marginTop: '20px' }}>Loading ....</Button>
        :
        <Button variant="contained" color="success" sx={{ width: '25%', marginLeft: '30px', marginTop: '20px' }} onClick={handleSubmit} >Tambah Kategori Baru</Button>
        }
    </Container>
  )
}

export default AdminCreateCategory;