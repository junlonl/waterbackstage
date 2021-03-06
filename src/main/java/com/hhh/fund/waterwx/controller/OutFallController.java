package com.hhh.fund.waterwx.controller;


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hhh.fund.waterwx.entity.OutfallPolluateResource;
import com.hhh.fund.waterwx.entity.SysUcenterDict;
import com.hhh.fund.waterwx.service.ResponsibilityService;
import com.hhh.fund.waterwx.service.SwjOutfallPolluateResourceService;
import com.hhh.fund.waterwx.webmodel.OutfallPolluateResourceBean;
import com.hhh.fund.waterwx.webmodel.PollutantSourceBean;
import com.hhh.fund.waterwx.webmodel.PublicSignsBoardInfoBean;
import com.hhh.fund.waterwx.webmodel.SmsPage;
import com.hhh.fund.web.model.DataTablesResult;

@Controller
@RequestMapping("/outFall")
public class OutFallController {
	
	@Autowired
	private SwjOutfallPolluateResourceService outfallService;
	
	@Autowired
	private ResponsibilityService responseService;
	
	private Map<String,String>dictMap = new HashMap<String,String>();
	
	@RequestMapping("/toOutFallList")
	public String toOutFallList(){
		return "waterwx/outfall_list";
	}
	
	private int getPage(int start, int pageSize) {
		return (int)Math.floor((double)start/pageSize);
	}
	
	
	/**
	 * 修改河道，返回数据
	 * */
	@RequestMapping(value="/findById")
	public @ResponseBody OutfallPolluateResourceBean findById(String id){
		OutfallPolluateResourceBean bean = outfallService.findById(id);
		bean.setTherectificationresponsibilityunitStr(dictMap.get(bean.getTherectificationresponsibilityunit()));
		return bean;
	}	
	
	/**
	 * 查询所有的河道
	 * */
	@RequestMapping(value="/searchAllOutFallList")
	public @ResponseBody DataTablesResult<OutfallPolluateResourceBean> searchAllResponse(@RequestParam(value = "start",defaultValue="0") int start,
			@RequestParam(value = "length",defaultValue="10") int pageSize,
			OutfallPolluateResourceBean bean){
		int page = getPage(start, pageSize);
		PageRequest pr = new PageRequest(page, pageSize);
		int t= pr.getPageNumber();
		SmsPage<OutfallPolluateResourceBean> records = outfallService.findAll(pr,bean);
		
		List<SysUcenterDict> unitList=responseService.findDict("responsibilityUnit");
		changeToMap(unitList,dictMap);
		changeDictCodeToNameToShow(records,dictMap);
		
		DataTablesResult<OutfallPolluateResourceBean> dtr = new DataTablesResult<OutfallPolluateResourceBean>();
		dtr.setData(records.getContent());
		dtr.setRecordsFiltered(new Long(records.getTotalElements()).intValue());
		dtr.setRecordsTotal(records.getTotalPages());
		return dtr;
	}
	
	private void changeToMap(List<SysUcenterDict> list, Map<String, String> map) {
		for(SysUcenterDict dict:list){
			map.put(dict.getCode(), dict.getName());
		}
	}
	
	private void changeDictCodeToNameToShow(SmsPage<OutfallPolluateResourceBean> records, Map<String, String> dictMap2) {
		List<OutfallPolluateResourceBean> data = records.getContent();
		for(OutfallPolluateResourceBean bean:data){
			bean.setTherectificationresponsibilityunitStr(dictMap2.get(bean.getTherectificationresponsibilityunit()));
		}
		
	}
	
	@RequestMapping("/downloadTemplate")
	public void downloadTemplate(HttpServletRequest request,HttpServletResponse response){
		try {
		    
			ServletContext sc = request.getServletContext();
			String realPath = sc.getRealPath("/template")+File.separator+"outfall-pollutant-template.xls";
			System.out.println(realPath);
			InputStream in = new FileInputStream(realPath);
			
			response.addHeader("Content-Disposition", "attachment;filename=" + new String("outfall-pollutant-template.xls"));
			response.setContentType("application/octet-stream");
			response.addHeader("Content-Length", "" + in.available());
			OutputStream os = response.getOutputStream();
			byte[]buff = new byte[1024];
			int i = 0;
			while((i=in.read(buff))!=-1){
				os.write(buff);// 输出文件
				os.flush();
			}
			os.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
}
