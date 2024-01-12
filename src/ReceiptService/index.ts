export class ReceiptService {
  private static instance: ReceiptService;

  private constructor() {}

  public static getInstance(): ReceiptService {
    if (!ReceiptService.instance) {
      ReceiptService.instance = new ReceiptService();
    }
    return ReceiptService.instance;
  }

  async upload(files: File[]) {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('https://postman-echo.com/post', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Upload successful. Response:', responseData);
      } else {
        console.error('Error uploading files. Status:', response.status);
      }
    } catch (error) {
      console.error('Error uploading files:');
    }
  }
}
