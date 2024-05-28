const {
    getAllTires,
    getTireById,
    deleteTire,
    addTire,
    editTire,
    tires
  } = require('./Controllers/Controller'); // Assuming your module file is named 'yourModule.js'

  
  describe('Tire API', () => {
    let mockRequest;
    let mockResponse;
  
    beforeEach(() => {
      mockRequest = {};
      mockResponse = {
        json: jest.fn(),
        status: jest.fn(() => mockResponse),
        send: jest.fn(),
      };
    });
  
    describe('getAllTires', () => {
        
      test('should return all tires', () => {
        getAllTires(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalled(tires); 
      });
    });
  
    describe('getTireById', () => {
      test('should return tire by id if exists', () => {
        const id = 1; 
        mockRequest.params = { id };
        getTireById(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalled();
      });
  
      test('should return 404 if tire not found', () => {
        const id = -1; 
        mockRequest.params = { id };
        getTireById(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith(`Entity with id ${id} was not found`);
      });
    });
  
    describe('deleteTire', () => {
        test('should delete tire by id if exists', () => {
          const id = 1; 
          mockRequest.params = { id };
          deleteTire(mockRequest, mockResponse);
          expect(mockResponse.status).toHaveBeenCalledWith(204);
        });
    
        test('should return 404 if tire not found', () => {
          const id = -1; 
          mockRequest.params = { id };
          deleteTire(mockRequest, mockResponse);
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.send).toHaveBeenCalledWith(`Entity with id ${id} was not found`);
        });
      });
    
      describe('addTire', () => {
        test('should add a new tire with valid data', () => {
          const newTireData = {
            brand: 'ExampleBrand',
            model: 'ExampleModel',
            price: 100,
            size: '225/55R18',
            quantity: 5,
            description: 'Example description',
          };
          mockRequest.body = newTireData;
          addTire(mockRequest, mockResponse);
          expect(mockResponse.status).toHaveBeenCalledWith(201);
          expect(mockResponse.json).toHaveBeenCalled();
        });

        test('should return 400 if data is invalid', () => {
            const newTireData = {
                brand: '',
                model: '',
                price: 100,
                size: '225/55R18',
                quantity: 5,
                description: 'Example description',
            };
            mockRequest.body = newTireData;
            addTire(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.send).toHaveBeenCalledWith('All fields must be filled in');
            });
    
      });
    
    
      describe('editTire', () => {
        test('should edit tire by id if exists with valid data', () => {
          const id = 1; 
          const updatedTireData = {
            brand: 'UpdatedBrand',
            model: 'UpdatedModel',
            price: 150,
            size: '185/65R15',
            quantity: 10,
            description: 'Updated description',
          };
          mockRequest.params = { id };
          mockRequest.body = updatedTireData;
          editTire(mockRequest, mockResponse);
                
        });

        test('should return 404 if tire not found', () => {
          const id = -1; 
          mockRequest.params = { id };
          editTire(mockRequest, mockResponse);
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.send).toHaveBeenCalledWith(`Entity with id ${id} was not found`);
        });
    
        
      });
    });
