package com.hhh.fund.waterwx;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hhh.fund.config.AppContext;
import com.hhh.fund.waterwx.service.SwjOutfallPolluateResourceService;
import com.hhh.fund.waterwx.service.SwjPollutantSourceService;
import com.hhh.fund.waterwx.webmodel.OutfallPolluateResourceBean;
import com.hhh.fund.waterwx.webmodel.PollutantSourceBean;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = AppContext.class)
public class ImportControllerTest {
	
	@Autowired
	private SwjOutfallPolluateResourceService service;
	
	@Test
    public void getBeanFromExcel() throws FileNotFoundException, IOException{  
        //1.得到Excel常用对象  
//      POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream("d:/FTP/test.xls"));  
        
        //2.得到Excel工作簿对象  
        Workbook wb = new HSSFWorkbook(new FileInputStream("F:/reposibility_new.xls"));  
        //3.得到Excel工作表对象  
        Sheet sheet = wb.getSheetAt(0);  
        //总行数  
        int trLength = sheet.getLastRowNum();  
        //4.得到Excel工作表的行  
        Row row = sheet.getRow(0);  
        //总列数  
        int tdLength = row.getLastCellNum();  
        //5.得到Excel工作表指定行的单元格  
        Cell cell = row.getCell((short)1);  
        //6.得到单元格样式  
        //CellStyle cellStyle = cell.getCellStyle();  
        for(int i=2;i<trLength;i++){
        	 //得到Excel工作表的行  
            Row row1 = sheet.getRow(i);  
            
        	for(int j=0;j<tdLength;j++){
        		Cell cell1 = row1.getCell(j);
	            /** 
	             * 为了处理：Excel异常Cannot get a text value from a numeric cell 
	             * 将所有列中的内容都设置成String类型格式 
	             */  
	            if(cell1!=null){  
	                  cell1.setCellType(Cell.CELL_TYPE_STRING);  
	            } 
	            System.out.println(cell1.getStringCellValue());
        	}
        	
           
        //得到Excel工作表指定行的单元格  
          
        //获得每一列中的值  
//		OutfallPolluateResourceBean resource = new OutfallPolluateResourceBean();
//		resource.setRivername(row1.getCell(1).getStringCellValue());
//		resource.setArea(row1.getCell(2).getStringCellValue());
//		resource.setLeftorrightbank(row1.getCell(3).getStringCellValue());
//		resource.setOutfalltype(row1.getCell(4).getStringCellValue());
//		resource.setOutfallcode(row1.getCell(5).getStringCellValue());
//		resource.setSecondaryunit(row1.getCell(6).getStringCellValue());
//		resource.setStreetname(row1.getCell(7).getStringCellValue());
//		resource.setStreetmanager(row1.getCell(8).getStringCellValue());
//		resource.setVillage(row1.getCell(9).getStringCellValue());
//		resource.setVillagemanager(row1.getCell(10).getStringCellValue());
//		resource.setPosition(row1.getCell(11).getStringCellValue());
//		resource.setCoordinate(row1.getCell(12).getStringCellValue());
//		resource.setOutfallsize(row1.getCell(13).getStringCellValue());
//		resource.setOutfallshape(row1.getCell(14).getStringCellValue());
//		resource.setPolldescription(row1.getCell(15).getStringCellValue());
//		
//		resource.setRectificationmeasures(row1.getCell(16).getStringCellValue());
//		resource.setDrainageTo(row1.getCell(17).getStringCellValue());
//		resource.setTherectificationresponsibilityunit(row1.getCell(18).getStringCellValue());
//		resource.setTimeofcompletion(row1.getCell(19).getStringCellValue());
//		resource.setRemark(row1.getCell(20).getStringCellValue());
//		System.err.println(resource);
//		service.save(resource);
        	
//    	PollutantSourceBean source = new PollutantSourceBean();
//		source.setRivername(row1.getCell(1).getStringCellValue());
//		source.setArea(row1.getCell(2).getStringCellValue());
//		source.setPollsourcename(row1.getCell(3).getStringCellValue());
//		source.setStreetname(row1.getCell(4).getStringCellValue());
//		source.setStreetmanager(row1.getCell(5).getStringCellValue());
//		source.setVillage(row1.getCell(6).getStringCellValue());
//		source.setVillagemanager(row1.getCell(7).getStringCellValue());
//		source.setPollsourcetype(row1.getCell(8).getStringCellValue());
//		source.setOutfalltype(row1.getCell(9).getStringCellValue());
//		source.setOutfallcode(row1.getCell(10).getStringCellValue());
//		source.setPosition(row1.getCell(11).getStringCellValue());
//		source.setCoordinate(row1.getCell(12).getStringCellValue());
//		source.setPolldescription(row1.getCell(13).getStringCellValue());
//		source.setDrainageto(row1.getCell(14).getStringCellValue());
//		source.setPolldischarginglicense(row1.getCell(15).getStringCellValue());
//		source.setDrainaglicense(row1.getCell(16).getStringCellValue());
//		source.setHasmeasures(row1.getCell(17).getStringCellValue());
//		source.setRectificationmeasures(row1.getCell(18).getStringCellValue());
//		source.setTherectificationresponsibilityunit(row1.getCell(19).getStringCellValue());
//		source.setTimeofcompletion(row1.getCell(20).getStringCellValue());
//		source.setRemark(row1.getCell(21).getStringCellValue());
//		System.out.println(source);
		
//		service.save(source);
		
        }  
    }  
	
	
//	@Test
//	public void testOutfall_polluate_resource()throws Exception{
		
//		Workbook rwb=Workbook.getWorkbook(file);
//        Sheet st=null;//读取文件
//        int colCnt = st.getColumns();//所有列
//        int rowCnt = st.getRows();//所有行
//		for(int row=2;row<rowCnt;row++){
//			PollutantSource source = new PollutantSource();
//			source.setRivername(st.getCell(1,row).getContents());
//			source.setArea(st.getCell(2,row).getContents());
//			source.setPollsourcename(st.getCell(3,row).getContents());
//			source.setStreetname(st.getCell(4,row).getContents());
//			source.setStreetmanager(st.getCell(5,row).getContents());
//			source.setVillage(st.getCell(6,row).getContents());
//			source.setVillagemanager(st.getCell(7,row).getContents());
//			source.setPollsourcetype(st.getCell(8,row).getContents());
//			source.setOutfalltype(st.getCell(9,row).getContents());
//			source.setOutfallcode(st.getCell(10,row).getContents());
//			source.setPosition(st.getCell(12,row).getContents());
//			source.setCoordinate(st.getCell(13,row).getContents());
//			source.setPolldescription(st.getCell(14,row).getContents());
//			source.setDrainageto(st.getCell(15,row).getContents());
//			source.setPolldischarginglicense(st.getCell(16,row).getContents());
//			source.setDrainaglicense(st.getCell(17,row).getContents());
//			source.setHasmeasures(st.getCell(18,row).getContents());
//			source.setRectificationmeasures(st.getCell(19,row).getContents());
//			source.setTherectificationresponsibilityunit(st.getCell(20,row).getContents());
//			source.setTimeofcompletion(st.getCell(21,row).getContents());
//			source.setRemark(st.getCell(22,row).getContents());
//			System.out.println(source);
//		}
//	}
	

//	public void testPolluateSource()throws Exception{
//		File file = new File("F:/outfall_source.xls"); 
//		Workbook rwb=Workbook.getWorkbook(file);
//        Sheet st=rwb.getSheet(0);//读取文件
////        int colCnt = st.getColumns();//所有列
//        int rowCnt = st.getRows();//所有行
//		for(int row=2;row<rowCnt;row++){
//				OutfallPolluateResource resource = new OutfallPolluateResource();
//				resource.setRivername(st.getCell(1,row).getContents());
//				resource.setArea(st.getCell(2,row).getContents());
//				resource.setLeftorrightbank(st.getCell(3,row).getContents());
//				resource.setOutfalltype(st.getCell(4,row).getContents());
//				resource.setOutfallcode(st.getCell(5,row).getContents());
//				resource.setSecondaryunit(st.getCell(6,row).getContents());
//				resource.setStreetname(st.getCell(7,row).getContents());
//				resource.setStreetmanager(st.getCell(8,row).getContents());
//				resource.setVillage(st.getCell(9,row).getContents());
//				resource.setVillagemanager(st.getCell(10,row).getContents());
//				resource.setPosition(st.getCell(11,row).getContents());
//				resource.setCoordinate(st.getCell(12,row).getContents());
//				resource.setOutfallsize(st.getCell(13,row).getContents());
//				resource.setOutfallshape(st.getCell(14,row).getContents());
//				resource.setPolldescription(st.getCell(15,row).getContents());
//				
//				resource.setDrainageTo(st.getCell(16,row).getContents());
//				resource.setRectificationmeasures(st.getCell(17,row).getContents());
//				resource.setTherectificationresponsibilityunit(st.getCell(18,row).getContents());
//				resource.setTimeofcompletion(st.getCell(19,row).getContents());
//				resource.setRemark(st.getCell(20,row).getContents());
//				System.out.println(resource);
//		}
//	}
	
	
	

//	public void testResponse() throws Exception{
//		File file = new File("F:/reposibility_new.xls"); 
//		Workbook rwb=Workbook.getWorkbook(file);
//        Sheet st=rwb.getSheet(0);//读取文件
////        int colCnt = st.getColumns();//所有列
//        int rowCnt = st.getRows();//所有行
//		for(int row=1;row<rowCnt;row++){
//			ResponsibilityBean bean = new ResponsibilityBean();
////			bean.setRiverCode(riverCode);
//			bean.setRiverName(st.getCell(1,row).getContents());
//			bean.setPartName(st.getCell(2,row).getContents());
//			bean.setLeftRight(st.getCell(3,row).getContents());
//			bean.setLeftRightLength(st.getCell(4,row).getContents());
//			
//			
//			bean.setDistMgrName(st.getCell(5,row).getContents());
//			bean.setDistMgrOrg(st.getCell(6,row).getContents());
//			bean.setDistMgrPosition(st.getCell(7,row).getContents());
//			bean.setDistMgrTel(st.getCell(8,row).getContents());
//			
//			
//			bean.setStreetMgrName(st.getCell(9,row).getContents());
//			bean.setStreetMgrOrg(st.getCell(10,row).getContents());
//			bean.setStreetMgrPosition(st.getCell(11,row).getContents());
//			bean.setStreetMgrTel(st.getCell(12,row).getContents());
//			
//			bean.setVillageMgrName(st.getCell(13,row).getContents());
//			bean.setVillageMgrOrg(st.getCell(14,row).getContents());
//			bean.setVillageMgrPosition(st.getCell(15,row).getContents());
//			bean.setVillageMgrTel(st.getCell(16,row).getContents());
//			
//			bean.setManageMgrName(st.getCell(17,row).getContents());
//			bean.setManageMgrOrg(st.getCell(18,row).getContents());
//			bean.setManageMgrPosition(st.getCell(19,row).getContents());
//			bean.setManageMgrTel(st.getCell(20,row).getContents());
//			
//			bean.setRemark(st.getCell(21,row).getContents());
//
//			respService.save(bean);
//		
//		}
//	}
	
	
//	public void testName() throws Exception {
//		
//		File file = new File("F:/public_signs_board_info.xls"); 
//		Workbook rwb=Workbook.getWorkbook(file);
//        Sheet st=rwb.getSheet(0);//读取文件
////        int colCnt = st.getColumns();//所有列
//        int rowCnt = st.getRows();//所有行
//		for(int row=1;row<rowCnt;row++){
////			
//			
//			PublicSignsBoardInfoBean bean = new PublicSignsBoardInfoBean();
////			bean.setId(st.getCell(0,row).getContents());
//			
//			//TODO
////			bean.setRiverCode();
//
//			bean.setRiverName(st.getCell(1,row).getContents());
//			bean.setLeftOrRightBank(st.getCell(2,row).getContents());
//			bean.setPartName(st.getCell(3,row).getContents());
//			bean.setPartNameLength(st.getCell(4,row).getContents());
//			bean.setBoardPosition(st.getCell(5,row).getContents());
//			bean.setDistMgrName(st.getCell(6,row).getContents());
//			bean.setDistMgrOrg(st.getCell(7,row).getContents());
//			bean.setDistMgrPosition(st.getCell(8,row).getContents());
//			
//			//TODO
////			bean.setDistMgrTel();
//			
//			bean.setStreetMgrName(st.getCell(9,row).getContents());
//			bean.setStreetMgrOrg(st.getCell(10,row).getContents());
//			bean.setStreetMgrPosition(st.getCell(11,row).getContents());
//			bean.setStreetMgrTel(st.getCell(12,row).getContents());
//			
//			bean.setVillageMgrName(st.getCell(13,row).getContents());
//			bean.setVillageMgrOrg(st.getCell(14,row).getContents());
//			bean.setVillageMgrPosition(st.getCell(15,row).getContents());
//			bean.setVillageMgrTel(st.getCell(16,row).getContents());
//			
//			bean.setManageMgrName(st.getCell(17,row).getContents());
//			bean.setManageMgrOrg(st.getCell(18,row).getContents());
//			bean.setManageMgrPosition(st.getCell(19,row).getContents());
//			bean.setManageMgrTel(st.getCell(20,row).getContents());
//			
//			
//			bean.setBoardCode(st.getCell(21,row).getContents());
//			bean.setRemark(st.getCell(22,row).getContents());
//			
//			service.save(bean);
//			
//		}
//	}
	
}



































